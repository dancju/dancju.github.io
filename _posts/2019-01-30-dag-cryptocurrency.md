---
layout: post
title: Comparison of DAG-based cryptocurrencies
comments:
  - author:
      type: github
      displayName: 647LiuSQ
      url: 'https://github.com/647LiuSQ'
      picture: 'https://avatars2.githubusercontent.com/u/27430946?v=4&s=73'
    content: >-
      &#x4E3B;&#x9875;&#x7ADF;&#x7136;&#x53C8;&#x6062;&#x590D;&#x4F7F;&#x7528;&#x4E86;&#xFF0C;&#x8D5E;&#xFF01;
    date: 2019-03-26T07:38:51.304Z
  - author:
      type: github
      displayName: 647LiuSQ
      url: 'https://github.com/647LiuSQ'
      picture: 'https://avatars2.githubusercontent.com/u/27430946?v=4&s=73'
    content: >-
      &#x4E3B;&#x9875;&#x7ADF;&#x7136;&#x53C8;&#x6062;&#x590D;&#x4F7F;&#x7528;&#x4E86;&#xFF0C;&#x8D5E;&#xFF01;
    date: 2019-03-26T07:39:45.066Z

---

The linear data structure highly constrains the performance of blockchain. Let's forget about the Bitcoin bottlenecks like its 1MiB/10min constraint for now. Imagine we're designing a high-performance payment system. If users are only allowed to append transactions/blocks when they have the latest whole ledger, plenty of time would be wasted in communicating and ensuring their ledger synchronised, and therefore can't reach a throughput as high as MasterCard/Visa. In a traditional distributed system like MasterCard/Visa, sharding would be used so transactions could be stored in the geographically nearest data centre. However, in a decentralised system, it could be challenging to design a sharding protocol upon blockchain while keeping the tamper resistance.

Many cryptocurrencies try to fix this contradiction by replacing the linear chain with a directed acyclic graph (DAG), with which users are allowed to append their transactions/blocks to a slightly out-dated ledger, and finally, their modifications would be jointly confirmed. This approach shares the basic idea of sharding: data could be stored in a regional node for a regional consensus, and finally become a global consensus. With such compromise, performance (throughput) and security (tamper resistance) could be balanced.

In this article, 3 DAG-based cryptocurrencies, _IOTA_, _Obyte_, and _Conflux_ will be introduced. All of them are claimed to reach a high throughput, and the only performance bottleneck is the network infrastructure. In all of them, the following topics will be illustrated.

1. How transactions were organised into a DAG instead of a blockchain;
1. Why they were designed as the way they are; and
1. How the tamper resistance is maintained.

Other subordinate topics regarding cryptocurrency, such as PoW/PoS, smart contract VM, will not be discussed. I will try to avoid mentioning the terms defined in their documents to make this article less painful to read.

**WARNING:** There's no investment advice rendered in this article.

# IOTA

The ledger of IOTA is topologically a DAG, of which each vertex is a transaction. There is no block or any similar concept in IOTA. In other words, every transaction has its own block. Differing from Bitcoin, whose linear structure guarantee each block has exactly one predecessor and one successor, each transaction in IOTA has two predecessors connected with approvals. When transaction X has two predecessors $A\gets X$ and $B\gets X$, the ledger represented by X equals to the union of the ledgers represented by A and B, and the transaction of X itself, i.e. $L\_X=L\_A\cup L\_B\cup\\{t\_X\\}$.

This structure arises a problem. When two transactions conflict, and there's no partial order between them, it'd be hard to decide which one is valid and which one is not. In other words, it's hard to design a decentralised, deterministic, and self-governed mechanism to resolve double-spendings in such structure. In Bitcoin, the longest chain is valid while others are abandoned orphans. However, in a DAG, since there's no total order exists, you can hardly say transaction A is inferior to transaction B thus shall be abandoned.

In IOTA, it's an authority called _coordinator_, [whose address is hard coded](https://github.com/iotaledger/iri/blob/bf402225942f790e056e04cd893141f802f7b90c/src/main/java/com/iota/iri/conf/BaseIotaConfig.java#L825), that is responsible for resolving all double-spendings. The coordinator referees which transaction is valid over others. Meanwhile, an attacker who knows the private key of the coordinator address can launch double-spending attacks at nearly zero cost.

# Obyte

Obyte, formerly known as Byteball, is similar to IOTA topologically. Each vertex is a transaction but could have one or more predecessors. Obyte resolves double-spending by defining a total order upon the DAG. When mutex transactions are posted to the network, and there's no partial order between them according to the DAG, all transactions are appended to the DAG. The one with a higher rank in the total order is considered valid while the rest are not.

When an attacker launches a double-spending, or furtherly, a multiple-spending, which consists of multiple transactions pointing to the same output of a valid transaction, only the first transaction should be valid. That is to say, on a good cryptocurrency consensus, it should be assured that the first publicly observed transaction is superior to the others according to the defined total order.

In Bitcoin, the first observed transaction is more likely to be mined into a block so the other mutex ones won't be acknowledged unless the attacker rent hash power for a 51% attack. In Obyte, Proof of Authority (PoA) is adopted instead of PoW. It is 12 witnesses with real-world identities that are responsible for witnessing and signing which transaction is first exposed to the network. According to the consensus, users' transactions and witnesses' approbations to each transaction mutually define the total order.

# Conflux

In Conflux, each vertex of the DAG is a block, and each block contains multiple transactions. A _pivot chain_ is selected throughout the DAG from the genesis block to a childless block with a deterministic algorithm. Each block is either:

1. _a (confirmed) pivotal block_ whose height is its location in the pivot chain;
1. _a confirmed non-pivotal block_ whose height is the height of the first pivotal block from which there exists a path to the non-pivotal block;
1. _an unconfirmed non-pivotal block_ to which there doesn't exist a path from a pivotal block.

Once the height of blocks is defined, the total order upon blocks and _number of confirmation_ can be defined as it is in Bitcoin. It was proven in the paper that Conflux shares the crucial feature of Bitcoin: the possibility of a block being tampered diminishes exponentially as its number of confirmation grows linearly.

# Summary

Replacing blockchain with block-DAG helps IOTA, Obyte, and Conflux reach a high throughput. Conflux claims in the paper that it "achieves 2.88G/h under 4MB block and 5s generation interval."

However, IOTA and Obyte fail to find a way to resolve double-spendings autonomously and introduce authorities as the resolver of double-spending, which makes their networks vulnerable to _cyber attacks_ and _politics_. If a) the attacker controls the IOTA coordinator or controls 7 of the 12 Obyte witnesses, or b) the IOTA coordinator do evil or 7 of the 12 Obyte witnesses conspire for evil, the marginal cost of launching double-spending attacks would be almost zero.

In Bitcoin and Conflux, in contrast, double-spendings are resolved in a decentralised manner which is more robust than the authority-led approach. Even though attackers can rent hash power to launch 51% attacks, each attack takes a considerable cost, i.e. the marginal cost is high.

# References

1. Churyumov, Anton. "Byteball: A Decentralized System for Storage and Transfer of Value." <https://obyte.org/Byteball.pdf>
1. Li, Chenxing, et al. "Scaling Nakamoto Consensus to Thousands of Transactions per Second." <https://arxiv.org/abs/1805.03870>
1. Popov, Serguei. "The Tangle." <https://iota.org/IOTA_Whitepaper.pdf>
