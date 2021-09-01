---
layout: post
title: Comparison of DAG-based Cryptocurrencies
---

The linear data structure severely constrains the performance of blockchains. In most blockchain implementations like Bitcoin, miners can only append transactions/blocks to the updated whole ledger. Communicating and synchronising everybody's ledgers causes a lot of waste of time and network resources. Meanwhile, in a traditional payment system with a high throughput like MasterCard/Visa, every data centre only stores a part of the whole ledger, and terminal devices only have to communicate with the geographical nearest data centre to finish a transaction. However, it is not easy to implement such a method or any other approach to reducing geographic redundancy in blockchains, as it would compromise the _tamper resistance_ of a blockchain.

Some cryptocurrencies try to tradeoff between throughput and tamper resistance by replacing the linear chain with a directed acyclic graph (DAG), where users are allowed to append their transactions/blocks to a slightly outdated ledger. Finally, their appendants would be jointly confirmed. This approach shares the basic idea of database sharding: data could be stored in a regional node for a regional consensus and ultimately become a global consensus. A legit balance between performance (throughput) and security (tamper resistance) is possible with such compromise.

This article will introduce three DAG-based cryptocurrencies, namely **IOTA**, **Obyte**, and **Conflux**. All of them claimed to achieve high throughput, leaving the network infrastructure being the only performance bottleneck. I will discuss each “blockchain” in the following three aspects.

1. How do they organise transactions into a DAG instead of a linear list;
1. Why they were designed as the way they are; and
1. How tamper resistance is maintained.

Other subordinate topics regarding cryptocurrency, such as PoW/PoS, smart contract VM, will not be discussed. I will avoid mentioning the terms defined in their documents to make this article less painful to read.

**Of course, no investment advice would be rendered in this article.**

# IOTA

The ledger of IOTA is topologically a DAG, of which each vertex is a transaction. There is no block or any similar concept in IOTA. In other words, every transaction is a block. Differing from Bitcoin, whose linear structure guarantee each block has exactly one predecessor and one successor, each transaction in IOTA has two predecessors connected with approvals. When transaction X has two predecessors $A\gets X$ and $B\gets X$, the ledger represented by X equals to the union of the ledgers represented by A and B, and the transaction of X itself, i.e. $L\_X=L\_A\cup L\_B\cup\\{t\_X\\}$.

This structure could not be more concise, which is good, yet failed to address the tamper resistance issue: when two or more transactions conflict, there is no priority between them, and it would be hard to decide which one is valid over the other ones. In other words, the paper failed to design a decentralised, deterministic, and self-governed mechanism to resolve double-spendings in such structure. In Bitcoin, the longest chain is valid while others are orphans. However, in a DAG, since there is no _total order_ exists, you can hardly say transaction A is inferior to transaction B thus shall be abandoned.

The tamper resistance is so crucial to a cryptocurrency, that it is the biggest focus of the paper of Bitcoin that how double-spendings are disputed and how tamper resistance is assured. IOTA either has such a mechanism but did not mention it in its paper, or does not have such a mechanism and is vulnerable to double-spending attacks. The answer is found in its source code. In IOTA, it is an authority role called _coordinator_, [whose address is hard coded](https://github.com/iotaledger/iri/blob/bf402225942f790e056e04cd893141f802f7b90c/src/main/java/com/iota/iri/conf/BaseIotaConfig.java#L825), that is entitled to and responsible for disputing all double-spendings. The coordinator referees which transaction is valid over others. Meanwhile, an attacker who knows the private key of the coordinator can launch double-spending attacks at nearly zero cost.

IOTA is the first DAG-based crypto with a major market cap. However, in their paper published in 2017, tamper resistance, being the most crucial issue for a cryptocurrency, was deliberately ignored like an "elephant in the room." This is arguably a significant flaw to a cryptocurrency as it failed to maintain tamper resistance in a decentralised manner but instead introduced an authority role. The exitance of the authority role makes the system not self-governed, and therefore much less elegant and much less trustworthy than Bitcoin.

# Obyte

Given that tamper resistance could be maintained if we define a total order upon the DAG structure. An intuitive idea is to use the broadcast time of a transaction to define the total order. That is exactly Obyte's strategy. Obyte, formerly known as Byteball, is similar to IOTA topologically. Each vertex is a transaction but could have one or more predecessors. Obyte maintains tamper resistance by defining a total order upon the DAG. When mutual exclusive transactions are posted to the ledger and there is no partial order between them according to the DAG, the first one observed by the distributed network is considered valid while others are not.

That consequently raises a problem: which node in the distributed network should be entitled to testify the time they observe a transaction, while they could be motivated to conspire with the double-spending attacker? In Obyte, there is again an authority role consisting of 12 "witnesses" with real-world identities that are entitled to and responsible for witnessing and signing the time when each transaction is exposed to the network. In their paper, such a consensus mechanism is called Proof of Authority (PoA) and users are supposed to trust their authority.

The Obyte paper acknowledged the problem which was absent in the IOTA paper and tried to solve it decently. However, although the right of disputing double-spendings is diluted to 12 nodes comparing to IOTA, it failed to get rid of the authority role in its design.

# Conflux

In Conflux, each vertex in the DAG is a block, and each block contains multiple transactions. A _pivotal chain_ is selected throughout the DAG from the genesis block to a childless block with a deterministic algorithm. With the pivotal chain, each block is classified into one of these categories:

1. _a (confirmed) pivotal block_ if it is on the pivotal chain,
1. _a confirmed non-pivotal block_ if there are one or more paths from a pivotal block to it, and
1. _an unconfirmed non-pivotal block_ if otherwise.

Their heights are defined as follows:

1. the height of a pivotal block is its location in the pivotal chain;
1. the height of a confirmed non-pivotal block is the height of the first pivotal block from which there exists a path to the block; and
1. unconfirmed non-pivotal blocks do not have heights, but will eventually become confirmed once there is a pivotal block (directly or transitivity) point to it.

With heights defined, a total order upon the blocks is defined as follows: the block with a smaller height has higher priority; when two blocks share the same height, the one with the smaller hash has higher priority. Moreover, the _number of confirmation_ of a block could be defined as the difference between the height of the block and the height of the whole ledger, just as traditional blockchains did.

Through a decentralised, deterministic, and self-governed mechanism, a total order of blocks is defined, without introducing any authorisations. Since this design shares many characters with Bitcoin, it also shares the crucial feature of Bitcoin: the possibility of a block being tampered diminishes exponentially as its number of confirmation grows linearly.

# Summary

Replacing blockchain with block-DAG helps IOTA, Obyte, and Conflux reach a high throughput. Conflux claims in the paper that it "achieves 2.88G/h under 4MB block and 5s generation interval."

However, IOTA and Obyte fail to find a way to resolve double-spendings autonomously and introduce authorisations as the disputer of double-spendings, which makes their networks vulnerable to _cyber attacks_ and _conspiracy_. If a) the attacker controls the IOTA coordinator or controls 7 of the 12 Obyte witnesses, or b) the IOTA coordinator do evil or 7 of the 12 Obyte witnesses conspire for evil, the marginal cost of launching double-spending attacks would be negligible. Such fact significantly damages their credibilities.

In Bitcoin and Conflux, in contrast, double-spendings are resolved in an autonomous manner which is more robust than the autocratic approach. Even though attackers can buy hash power to launch 51% attacks, its cost would very possibly be higher than the return. Users, on the other hand, can always wait for more number of confirmations until a 51% attack being unprofitable.

# References

1. Churyumov, Anton. "Byteball: A Decentralized System for Storage and Transfer of Value." <https://obyte.org/Byteball.pdf>
1. Li, Chenxing, et al. "Scaling Nakamoto Consensus to Thousands of Transactions per Second." <https://arxiv.org/abs/1805.03870>
1. Popov, Serguei. "The Tangle." <https://iota.org/IOTA_Whitepaper.pdf>
