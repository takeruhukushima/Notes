---
{
  "id": "85",
  "title": "哲学をlean4で証明してみた",
  "description": "結論：どの哲学も論理は破綻していない（証明できる）が定義した前提に批判の余地を残している。",
  "datePublished": "2026-02-08",
  "tags": [],
  "footnotes": [
    {
      "id": "1",
      "content": "lean4web",
      "link": "https://lean.math.hhu.de/"
    }
  ]
}
---

プログラミング言語にleanという言語がある。形式署名といって（実は僕もあまり詳しくないのだけど）数学の証明を行うことができる。言語だ。

その言語を使って、哲学の命題。精神分析理論やシニフィアン連鎖を証明してみた。以下はどちらもlean 4 webにて証明が完了したコードだ。面白いのはAIに聞くとどちらのコードも全く反対の前提からスタートしているということだ。つまり、leanを使うのは面白いが、前提となる事マークが無批判に定義されてしまうため批判の余地を残してしまうということだ。人文学者が扱う自然言語というのはなおも強力なのだろう。

以下のどちらのコードもfottonotesにおいているlean4webで証明可能です。

以下ラカン

```lean
import Mathlib.Data.Finset.Basic
import Mathlib.Logic.Basic
import Mathlib.Data.Fintype.Basic
import Mathlib.Data.Fintype.Card
import Mathlib.Tactic

open Classical

/-!
# ラカン的構造モデル (修正版: 名前空間の解決)
-/

structure LacanianDynamicSystem where
Signifier : Type
Object : Type

-- 有限性の要請
[fintype_sig : Fintype Signifier]
[decidable_eq_sig : DecidableEq Signifier]
[nonempty_sig : Nonempty Signifier]

-- 【対象a (Objet petit a)】
objet_a : Object

-- 【表象作用】
representation : Signifier → Finset Object

-- 【メトニミー (Metonymy)】
adjacency : Signifier → Finset Signifier

-- 【欠如の公理】
lack_of_a : ∀ (s : Signifier), objet_a ∉ representation s

-- 【欲望のグラフ】
drive_continues : ∀ (s : Signifier), (adjacency s).Nonempty

attribute [instance] LacanianDynamicSystem.fintype_sig
attribute [instance] LacanianDynamicSystem.decidable_eq_sig
attribute [instance] LacanianDynamicSystem.nonempty_sig

namespace LacanianDynamicSystem

variable (sys : LacanianDynamicSystem)

/-- 正当な連鎖であるか判定する述語 -/
def IsValidChain (c : ℕ → sys.Signifier) : Prop :=
∀ t : ℕ, c (t + 1) ∈ sys.adjacency (c t)

/-- 縫合点 (Point de Capiton) -/
def IsQuiltingPoint (c : ℕ → sys.Signifier) (start_idx end_idx : ℕ) : Prop :=
start_idx < end_idx ∧ c start_idx = c end_idx

/-- 縫合点の必然性定理 -/
theorem inevitable_quilting (c : ℕ → sys.Signifier) :
∃ i j, IsQuiltingPoint sys c i j := by
have h_repeat := Finite.exists_ne_map_eq_of_infinite c
rcases h_repeat with ⟨i, j, hne, heq⟩
rcases lt_trichotomy i j with h | h | h
· exact ⟨i, j, h, heq⟩
· contradiction
· exact ⟨j, i, h, heq.symm⟩

end LacanianDynamicSystem

/-!
## 具体例：オイディプス構造
-/

inductive Sy : Type | Father | Mother | Child | Phallus | Law
deriving DecidableEq, Repr

inductive Ob : Type | Love | Milk | Authority | ObjetA
deriving DecidableEq, Repr

open Sy Ob

instance : Fintype Sy where
elems := {Father, Mother, Child, Phallus, Law}
complete := by intro x; cases x <;> simp

instance : Nonempty Sy := ⟨Child⟩

/-- オイディプス構造の定義 -/
def OedipusComplex : LacanianDynamicSystem where
Signifier := Sy
Object := Ob
objet_a := ObjetA

representation := fun
| Father => {Authority}
| Mother => {Love, Milk}
| Child => {Love}
| Phallus => {Authority, Love}
| Law => {Authority}

lack_of_a := by
intro s
cases s <;> simp

adjacency := fun
| Child => {Mother, Father}
| Mother => {Child, Phallus}
| Father => {Phallus, Law}
| Phallus => {Father, Mother, Child}
| Law => {Father, Phallus}

drive_continues := by
intro s; cases s <;> simp [Finset.insert_nonempty]

namespace Simulation

open LacanianDynamicSystem

-- 歴史の定義（変更なし）
def history1 (n : ℕ) : Sy :=
match n % 3 with
| 0 => Child
| 1 => Mother
| _ => Phallus

-- 歴史の正当性の証明（最終クリーン版）
theorem history1_valid : IsValidChain OedipusComplex history1 := by
intro t
-- t % 3 の値（0, 1, 2）で場合分け
generalize h : t % 3 = m
match m with
| 0 =>
-- ケース1: Child (0) -> Mother (1)
have h_next : (t + 1) % 3 = 1 := by
rw [Nat.add_mod, h]
rfl
simp [history1, OedipusComplex, h, h_next]
| 1 =>
-- ケース2: Mother (1) -> Phallus (2)
have h_next : (t + 1) % 3 = 2 := by
rw [Nat.add_mod, h]
rfl
simp [history1, OedipusComplex, h, h_next]
| 2 =>
-- ケース3: Phallus (2) -> Child (0)
have h_next : (t + 1) % 3 = 0 := by
rw [Nat.add_mod, h]
rfl
-- 不要なヒント(h_not_...)を削除し、シンプルにしました
simp [history1, OedipusComplex, h, h_next]
| n + 3 =>
-- ケース4: 3以上（ありえない）
have h_lt := Nat.mod_lt t (by norm_num : 3 > 0)
rw [h] at h_lt
contradiction

end Simulation
```

以下ドゥルーズ。

```lean
import Mathlib.Data.Finset.Basic
import Mathlib.Logic.Basic
import Mathlib.Tactic

open Classical

/-!
# スキゾ分析的機械 (Schizoanalytic Machine) - Lean 4 Fixed Version
-/

namespace Schizoanalysis

-- ==========================================
-- 1. 存在論的定義：部分対象と体制
-- ==========================================

/-- 部分対象 (Partial Object) -/
inductive PartialObject
| Mouth -- 口
| Breast -- 乳房
| Anus -- 肛門
| Machine (id : ℕ) -- 無限に生成される抽象機械
| Law -- 法
| Glitch -- グリッチ
deriving Repr, DecidableEq, Inhabited

/-- 体制 (Regime) -/
inductive Regime
| Oedipal -- パラノイア的体制
| Capitalist -- 公理系的体制
| Nomadic -- スキゾ的体制
deriving Repr, DecidableEq, Inhabited

open PartialObject Regime

-- ==========================================
-- 2. 機械の動作論理：接続と切断
-- ==========================================

/-- 機械的出来事 (Machinic Event) -/
inductive MachinicEvent
| Connect (obj : PartialObject) : MachinicEvent
| Rupture (new_regime : Regime) : MachinicEvent
deriving Repr, DecidableEq

open MachinicEvent

/-- 欲望機械 (Desiring Machine) の定義 -/
structure DesiringMachine where
process : Regime → PartialObject → MachinicEvent

-- ==========================================
-- 3. 状態遷移システム (Simulation Engine)
-- ==========================================

/-- システム全体の状態 -/
structure SystemState where
regime : Regime
current_obj : PartialObject
deriving Repr, DecidableEq

/-- 機械の1ステップ実行（状態遷移関数） -/
def run_step (m : DesiringMachine) (s : SystemState) : SystemState :=
match m.process s.regime s.current_obj with
| Connect next_obj =>
{ s with current_obj := next_obj }
| Rupture next_regime =>
{ regime := next_regime, current_obj := Glitch }

/-- 欲望の歴史（生成変化の譜面）
Stream型（非推奨）の代わりに、単純な自然数からの関数を使用 -/
def history (m : DesiringMachine) (start : SystemState) : ℕ → SystemState
| 0 => start
| (n + 1) => run_step m (history m start n)

-- ==========================================
-- 4. 具体例：アンチ・オイディプス機械
-- ==========================================

def anti_oedipus_logic : Regime → PartialObject → MachinicEvent
| Oedipal, Law => Rupture Nomadic -- 法に出会うと切断してノマド化
| Oedipal, Mouth => Connect Breast
| Oedipal, _ => Connect Mouth
| Nomadic, Glitch => Connect (Machine 0) -- 切断直後、生産開始
| Nomadic, Machine n => Connect (Machine (n + 1)) -- 生成変化
| Nomadic, _ => Connect (Machine 0)
| _, _ => Connect Glitch

def MySchizoMachine : DesiringMachine := ⟨anti_oedipus_logic⟩

-- ==========================================
-- 5. ドゥルーズ的定理の証明 (修正版)
-- ==========================================

/-- 定理1: 縫合点の破壊
simp だけで証明が完了するため、余計なコマンドを削除 -/
theorem escape_oedipus_cycle :
let start := SystemState.mk Oedipal Law
let next := run_step MySchizoMachine start
next.regime ≠ Oedipal := by
-- 定義を展開して簡約化すると、Nomadic ≠ Oedipal となり、これは真である
simp [run_step, MySchizoMachine, anti_oedipus_logic]

/-- 定理2: 生成変化の無限性
simp だけで証明可能 -/
theorem nomadic_divergence (n : ℕ) :
let start := SystemState.mk Nomadic (Machine n)
let next := run_step MySchizoMachine start
next.current_obj ≠ start.current_obj := by
simp [run_step, MySchizoMachine, anti_oedipus_logic]
-- Machine (n + 1) ≠ Machine n は自動的に証明される

/-- 定理3: 非意味的切断の実在 -/
theorem rupture_is_continuation (s : SystemState) :
∃ next_s, next_s = run_step MySchizoMachine s := by
use (run_step MySchizoMachine s)
rfl

end Schizoanalysis
```
