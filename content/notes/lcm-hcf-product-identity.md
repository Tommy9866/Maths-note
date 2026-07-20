---
title: LCM × HCF = a × b
form: F1, F2, F3
section: junior
topic: Other Typical Topics
subtopic: Enrichment Facts
tags: enrichment, HCF, LCM, beyond-syllabus
---

## Formula table

| Fact | Formula |
|------|---------|
| Product identity (two positive integers) | $\operatorname{LCM}(a,b)\times\operatorname{HCF}(a,b)=a\times b$ |
| Useful rearrange | $\operatorname{LCM}(a,b)=\dfrac{ab}{\operatorname{HCF}(a,b)}$ |
| Useful rearrange | $\operatorname{HCF}(a,b)=\dfrac{ab}{\operatorname{LCM}(a,b)}$ |

> This is a standard number-theory identity. It is **not required** as a named syllabus theorem in junior forms, but it is very useful and worth knowing.

## Derivation (prime factors)

Write

$$a=2^{x}3^{y}5^{z}\cdots,\qquad b=2^{u}3^{v}5^{w}\cdots$$

Then

$$
\begin{align*}
\operatorname{HCF}(a,b) &= 2^{\min(x,u)}3^{\min(y,v)}\cdots \\
\operatorname{LCM}(a,b) &= 2^{\max(x,u)}3^{\max(y,v)}\cdots
\end{align*}
$$

For any pair of exponents,

$$\min(x,u)+\max(x,u)=x+u$$

So multiplying HCF and LCM gives exactly the same primes and powers as $a\times b$:

$$\operatorname{HCF}(a,b)\times\operatorname{LCM}(a,b)=a\times b$$

## Number examples

| $a$ | $b$ | HCF | LCM | Check |
|-----|-----|-----|-----|-------|
| $12$ | $18$ | $6$ | $36$ | $6\times 36=216$ and $12\times 18=216$ |
| $56$ | $84$ | $28$ | $168$ | $28\times 168=4704$ and $56\times 84=4704$ |
| $18$ | $60$ | $6$ | $180$ | $6\times 180=1080$ and $18\times 60=1080$ |

### Worked example

Find $\operatorname{LCM}(56,84)$ if $\operatorname{HCF}(56,84)=28$.

$$\operatorname{LCM}(56,84)=\frac{56\times 84}{28}=\frac{4704}{28}=168$$
