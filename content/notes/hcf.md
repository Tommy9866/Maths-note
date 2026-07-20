---
title: Highest Common Factor (HCF)
form: F1
section: junior
topic: Other Typical Topics
subtopic: HCF
tags: factors, HCF, GCD, MIF-1A-Ch1
---

The **H.C.F.** (also **G.C.D.**) of integers is the largest positive integer that divides all of them.

[[diagram:short-division-hcf|Demo style: HCF of 56 and 84 by short division]]

## Formula / method table

| Method | Rule |
|--------|------|
| Prime factors | For each **common** prime, take the **smallest** index |
| Short division | Divide by common primes; multiply those divisors |
| Relation with LCM | $\operatorname{HCF}(a,b)\times\operatorname{LCM}(a,b)=a\times b$ (two positives) |

## Derivation of the prime-factor rule

If

$$a = 2^{x}3^{y}5^{z}\cdots,\qquad b = 2^{u}3^{v}5^{w}\cdots$$

then any common factor can use at most the smaller power of each prime. The largest such factor is

$$\operatorname{HCF}(a,b)=2^{\min(x,u)}3^{\min(y,v)}5^{\min(z,w)}\cdots$$

## Number examples

### Example 1 — prime factorization

$$56 = 2^3\times 7,\qquad 84 = 2^2\times 3\times 7$$

| Prime | In $56$ | In $84$ | Take |
|-------|---------|---------|------|
| $2$ | $2^3$ | $2^2$ | $2^2$ |
| $3$ | — | $3^1$ | — |
| $7$ | $7^1$ | $7^1$ | $7^1$ |

$$\operatorname{HCF}(56,84)=2^2\times 7=28$$

### Example 2 — check by listing

Factors of $56$: $1,2,4,7,8,14,28,56$  
Factors of $84$: $1,2,3,4,6,7,12,14,21,28,42,84$  
Common factors end at $28$ → HCF $=28$.
