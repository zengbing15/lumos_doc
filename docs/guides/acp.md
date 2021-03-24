---
id: acp
title: Anyone Can Pay
---

Anyone can pay is a new lock script for CKB. The script can accept any amount of [Simple UDT](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0025-simple-udt/0025-simple-udt.md) or CKB payment. Previously, one can only transfer to another user at least 61 CKBytes when using the default lock, possibly more when using other lock scripts or type scripts. This is becoming a bigger problem when UDT support lands in CKB: a naive UDT transfer operation will not only require UDTs, but CKByte to keep the UDTs in a cell as well.

Here we try to solve the problem by introducing a new anyone-can-pay lock script, which can be unlocked not only by the validation of a signature, but also by accepting any amount of payment. This way, a user should be able to send any amount of CKBytes or UDTs to a cell using anyone-can-pay lock instead of always creating a new cell. It thus provides a solution to both problems above.