---
layout: post
title: Two Prolog solutions to TSP
---

I'm posting these code here because I can not find a briefer solution.

# Brute force search

```prolog
arc(a, b, 10).
arc(a, c, 2).
arc(a, d, 9).
arc(a, e, 11).
arc(b, c, 8).
arc(b, d, 12).
arc(b, e, 6).
arc(c, d, 3).
arc(c, e, 8).
arc(d, e, 9).

edge(X, Y, Weight) :- arc(X, Y, Weight) ; arc(Y, X, Weight).

path([_], 0).
path([X, Y | Tail], Cost) :-
    edge(X, Y, Cost0),
    path([Y | Tail], Cost1),
    \+ member(X, Tail),
    Cost is Cost0+Cost1.

hami_cycle([a | Tail], Cost) :-
    length(Tail, 4),
    edge(a, Last, Cost0),
    last(Tail, Last),
    path([a | Tail], Cost1),
    Cost is Cost0+Cost1.

min_hami_cycle(Path, Cost) :-
    hami_cycle(Path, Cost),
    \+ (hami_cycle(_, T), T<Cost).
```

# Held-Karp algorithm

This following implementation is far from elegance. You can perceive a C thinking style in this code. I tried to make a better one but bogged into bugs of mystery. Hopefully I would revise this piece of code someday.

```prolog
arc(a, b, 10).
arc(a, c, 2).
arc(a, d, 9).
arc(a, e, 11).
arc(b, c, 8).
arc(b, d, 12).
arc(b, e, 6).
arc(c, d, 3).
arc(c, e, 8).
arc(d, e, 9).

edge(X, Y, Weight) :- arc(X, Y, Weight) ; arc(Y, X, Weight).

path([Begin], End, [Begin], Cost) :- edge(Begin, End, Cost).
path(Visited, End, [Last | Path1], Cost) :-
    member(Last, Visited),
    delete(Visited, Last, Visited1),
    min_path(Visited1, Last, Path1, Cost1),
    edge(Last, End, Cost0),
    Cost is Cost0+Cost1.

min_path(Visited, End, Path, Cost) :-
    path(Visited, End, Path, Cost),
    \+ (path(Visited, End, _, T), T<Cost).

hami_cycle([a | Path], Cost) :-
    min_path([b, c, d, e], a, Path, Cost1),
    last(Path, Last),
    edge(a, Last, Cost0),
    Cost is Cost0+Cost1.

travel(Path, Cost) :-
    hami_cycle(Path, Cost),
    \+ (hami_cycle(_, T), T<Cost).
```
