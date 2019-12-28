---
title: python-itertools
date: 2018-07-17 21:56:29
tags: [python]
categories: program
description: Python 内置模块之 itertools
---


## Python 内置模块之 itertools

### 组合函数 combinations

> combinations

示例: 给定一个数组 ['a', 'b', 'c', 'd'], 求该数组的所有子串集合

转为求字符串 'abcd' 子串 (答案：a, b, c, d, ab, ac, ad, bc, bd, abc, abd ….. abcd 共15个).

借助 `combinations` 函数实现随机**不重复**组合.

```python
arr = ['a', 'b', 'c', 'd']
string = ''.join(arr)  # 'abcd'
substring = []

for i in range(len(string)):
    # print('i = {0}'.format(i))  # 0, 1, 2, 3
    print(list(combinations(string, i+1)))  # 输出见下面
    substring.extend(list(combinations(string, i+1)))
    substring = [''.join(s) for s in substring]
    print(substring)

```

`for` 循环中 `print` 输出是 list(tuple) 类型:

```bash
[('a',), ('b',), ('c',), ('d',)]
[('a', 'b'), ('a', 'c'), ('a', 'd'), ('b', 'c'), ('b', 'd'), ('c', 'd')]
[('a', 'b', 'c'), ('a', 'b', 'd'), ('a', 'c', 'd'), ('b', 'c', 'd')]
[('a', 'b', 'c', 'd')]
```

> combinations(str, n), 该方法即为 取 str 中的n个字符组合.

`combinations(string, i+1)` 的返回值为 `combinations object`:
形如:

```bash
<itertools.combinations object at 0x10ca179b0>
<itertools.combinations object at 0x10ca179b0>
<itertools.combinations object at 0x10ca8d9b0>
<itertools.combinations object at 0x10ca8d9b0>
```

所以, 该方法主要是用来组合!!!

### 排列函数 permutations

> permutations

```python3
>>> list(permutations([1,3,5], None))
[(1, 3, 5), (1, 5, 3), (3, 1, 5), (3, 5, 1), (5, 1, 3), (5, 3, 1)]
```

继续使用上面的例子.

```python
res_per = []
for i in range(len(string)):
    # 这里不能使用 append! 🙂
    res_per.extend(list(permutations(string, i + 1)))
    res_per = [''.join(s) for s in res_per]

print(res_per)
print(len(res_per))  # 64

```

`res_per` 的输出结果为:

```bash
['a', 'b', 'c', 'd', 'ab', 'ac', 'ad', 'ba', 'bc', 'bd', 'ca', 'cb', 'cd', 'da', 'db', 'dc', 'abc', 'abd', 'acb', 'acd', 'adb', 'adc', 'bac', 'bad', 'bca', 'bcd', 'bda', 'bdc', 'cab', 'cad', 'cba', 'cbd', 'cda', 'cdb', 'dab', 'dac', 'dba', 'dbc', 'dca', 'dcb', 'abcd', 'abdc', 'acbd', 'acdb', 'adbc', 'adcb', 'bacd', 'badc', 'bcad', 'bcda', 'bdac', 'bdca', 'cabd', 'cadb', 'cbad', 'cbda', 'cdab', 'cdba', 'dabc', 'dacb', 'dbac', 'dbca', 'dcab', 'dcba']
```

共 64 个组合.

该方法主要用来排列!!!

### TODO 源码阅读

参考实现:

```python
def combinations(iterable, r):
    # combinations('ABCD', 2) --> AB AC AD BC BD CD
    # combinations(range(4), 3) --> 012 013 023 123
    pool = tuple(iterable)
    n = len(pool)
    if r > n:
        return
    indices = list(range(r))
    yield tuple(pool[i] for i in indices)
    while True:
        for i in reversed(range(r)):
            if indices[i] != i + n - r:
                break
        else:
            return
        indices[i] += 1
        for j in range(i+1, r):
            indices[j] = indices[j-1] + 1
        yield tuple(pool[i] for i in indices)
```

> 解析 ...

python 3.7

<https://docs.python.org/3.7/library/itertools.html>

python 2.7

<https://docs.python.org/2/library/itertools.html>

### 附 append 与 extend 区别

这2个方法都是用来向数组/list 中增加数据的。

`.append(x)` 接受的参数: 可以是一个数字或字符串，也可以是一个数组 list 或 tuple 或 dict, 简言之，.append()可接受任何类型的数据塞进已有的 list 中.

```python3
>>> test3
[1, 3, 5]
>>> test3.append({'name': 'lomo123'})
>>> test3
[1, 3, 5, {'name': 'lomo123'}]
```

注意：如果 append 传入的参数 x 是 数组 list 类型，则该 list 维数会在原来的基础上+1，如 ori = [], ori.append([1,2,3]), 则 ori = [[1,2,3]] 变为二维数组了，使用 extend 则不会。

`.extend(x)` 接收的参数必须是一个str类型的字符串或 list 数组类型 或 tuple 类型.

如，e.g.

```python3
	test2 = [1,3,5]
	test2.extend(1)  # 会报错
	test2.extend('a')  # [1, 3, 5, 'a']

	# 传字符串
	test2.extend('123')   # 会将该字符串转为 list 然后与原数组合并
	# 输出：
	>>> test2
	[1, 3, 5, 'a', '1', '2', '3']

	# 传 tuple：
    >>> test2.extend(('c','d'))
    >>> test2
    [1, 3, 5, 'a', '1', '2', '3', 'c', 'd']

	# 传 list：
	>>> test2.extend([11,'lomo'])
	>>> test2
	[1, 3, 5, 'a', '1', '2', '3', 'c', 'd', 11, 'lomo']

	# 传 dict：
	>>> test3
	[1, 3, 5]
	>>> test3.extend({'name': 'lomo6'})
	>>> test3
	[1, 3, 5, 'name']
	>>> test3.extend({'age': 8})
	>>> test3
	[1, 3, 5, 'name', 'age']
```

可以看到传入 `dict` 时，extend 只会把 dict 的 key 取出来 append 到数组最后。

### 参考

排列与组合公式:

<https://www.zhihu.com/question/26094736>