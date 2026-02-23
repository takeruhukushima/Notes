---
{
  "id": "87",
  "title": "ScholarViewとathub",
  "description": "Decentralized Deliberation Standard:DDSをきっかけに",
  "datePublished": "2026-02-23",
  "tags": [],
  "footnotes": [
    {
      "id": "1",
      "content": "From ZK-first to AT Protocol — our path to DDS",
      "link": "https://whtwnd.com/agoracitizen.network/3meq2b36rw42s"
    },{
      "id": "2",
      "content": "dds-wg",
      "link": "https://github.com/dds-wg"
    },{
      "id": "3",
      "content": "dds",
      "link": "https://www.dds.xyz/"
    },{
      "id": "4",
      "content": "ScholarView",
      "link": "https://github.com/takeruhukushima/ScholarView"
    },{
      "id": "5",
      "content": "athub",
      "link": "https://github.com/takeruhukushima/athub"
    }




  ]
}
---
　ZKorum/Agoraのプロジェクトチーム、主にCTOのNicolasが掲げたDDSと呼ばれるプロトコルを「手伝ってみようかな」とツイートしたところリプをいただいた。せっかくリプライをいただいたので、何か手伝えることがありますか？と聞いてみたところ、何が面白いと思うの？と聞かれた。DDSは誰でもデータを取得してapp viewでアプリかできるところが面白い。それを言ってみたら、そしたら今からでもatproto.comで実際にアプリを作ってみたらいいよと言われたことがきっかけになってat protoを使ったアプリケーションを開発した。

　今のところVercelで無料デプロイできるものという制約を決めている。理由は学生でhoby projectだから。お金などかけてられない。

　scholarViewは結果的に研究者が使うエディタになった。論文likeな論考を書く時に使われる。そしていつでもat protocolを用いて公開できるところが特徴。公開と同時にBskyで投稿することもできその投稿の中のコメントで議論ができる。この議論の部分をいずれagoraと接続してコンセンサスを獲得できるようにする仕組みにする予定だ。

　athubの方は無料でホスティングできないので開発はかなり延期するが、非エンジニア向けのOpenなプロジェクト管理ツール。ユーザはrepoというlexiconを持つQuestをまず公開し、そこにissueというlexiconを持つ提案proposalやcommitというlexiconを持つ貢献contributionを行うことができる。貢献に応じてawardをユーザから与えてもらう仕組みだ。

　これからはScholarViewの方をリッチにしていって、論文likeな論考を２本か３本ほど投稿するつもりだ。3月から5月ごろにはDDSのPoCが出来上がるのでそちらと接続するテストも行ってみたいところだ。

　楽しくなってきた。
