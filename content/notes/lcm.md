---
title: Least Common Multiple (LCM)
form: F1
section: junior
topic: Other Typical Topics
subtopic: LCM
tags: multiples, LCM, MIF-1A-Ch1
---

The **L.C.M.** of integers is the smallest positive integer that is a multiple of all of them.

[[diagram:short-division-lcm|Demo style: LCM of 18 and 60 by short division]]

## Formula / method table

| Method | Rule |
|--------|------|
| Prime factors | For **every** prime that appears, take the **largest** index |
| Short division | Multiply all divisors and remaining factors |
| Relation with HCF | $\operatorname{LCM}(a,b)=\dfrac{a\times b}{\operatorname{HCF}(a,b)}$ |

## Derivation of the prime-factor rule

If

$$a = 2^{x}3^{y}\cdots,\qquad b = 2^{u}3^{v}\cdots$$

a common multiple must include at least the larger power of each prime:

$$\operatorname{LCM}(a,b)=2^{\max(x,u)}3^{\max(y,v)}\cdots$$

## Number examples

### Example 1

$$18 = 2\times 3^2,\qquad 60 = 2^2\times 3\times 5$$

| Prime | In $18$ | In $60$ | Take |
|-------|---------|---------|------|
| $2$ | $2^1$ | $2^2$ | $2^2$ |
| $3$ | $3^2$ | $3^1$ | $3^2$ |
| $5$ | — | $5^1$ | $5^1$ |

$$\operatorname{LCM}(18,60)=2^2\times 3^2\times 5=180$$

### Example 2 — using HCF

$\operatorname{HCF}(18,60)=6$, so

$$\operatorname{LCM}(18,60)=\frac{18\times 60}{6}=\frac{1080}{6}=180$$
