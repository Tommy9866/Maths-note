---
title: Divisibility Rules
form: F1
section: junior
topic: Other Typical Topics
subtopic: Divisibility Rules
tags: integers, factors, MIF-1A-Ch1
---

An integer $n$ is **divisible** by $d$ if there exists an integer $k$ such that $n = dk$ (remainder $0$).

[[diagram:digit-sum|Demo style: check divisibility by 3 or 9 using the digit sum]]

[[diagram:divisibility-digits|Demo style: check divisibility by 4 using the last two digits]]

## Formula / rule table

| Divisible by | Rule |
|--------------|------|
| $2$ | Units digit is even ($0,2,4,6,8$) |
| $3$ | Sum of digits is divisible by $3$ |
| $4$ | Number formed by last **two** digits is divisible by $4$ |
| $5$ | Units digit is $0$ or $5$ |
| $6$ | Divisible by **both** $2$ and $3$ |
| $8$ | Number formed by last **three** digits is divisible by $8$ |
| $9$ | Sum of digits is divisible by $9$ |
| $10$ | Units digit is $0$ |

## Why (short idea)

- For $2,5,10$: only the units digit matters because $10,100,1000,\ldots$ are all divisible by them.
- For $4$ and $8$: $100$ is divisible by $4$, and $1000$ is divisible by $8$, so only the last $2$ or $3$ digits matter.
- For $3$ and $9$: a number equals the sum of its digits plus multiples of $9$ (and $9$ is a multiple of $3$), so divisibility follows the digit sum.

## Number examples

| Number | Check | Result |
|--------|-------|--------|
| $612$ | last two digits $12$, $12\div 4=3$ | divisible by $4$ |
| $468$ | digit sum $4+6+8=18$, $18\div 9=2$ | divisible by $3$ and $9$ |
| $288$ | even, and digit sum $18$ divisible by $3$ | divisible by $6$ |
| $1738$ | digit sum $19$, not divisible by $3$ | not divisible by $3$ or $9$ |
