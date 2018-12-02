---
title: python pdb
date: 2018-11-10 22:41:16
tags: [Python, PDB]
categories: program
description: pdb调试小记
---

## pdb 调试小记

### 起源

业务层接口获取数据 `GET` 新接口时, 遇到以下错误 
```bash
AttributeError: Could not locate column in row for column 'iteritems' 
```

### 解决过程

Debug 过程:

首先，在 `controller` 层接口代码添加 `pdb` 调试入口.

```python
def get(lotan_session, offset, limit):
    scores = QualityScoreDAO.get_list_scores(offset=offset, limit=limit)
    import pdb
    pdb.set_trace()
    return [lotan_session.build_model(QualityScore, id=score.id) for score in scores]
```

然后，重启服务，模拟请求，程序运行到按照设置的 `pdb` 处，终端进入另一个类似 `python`的 `console`, 即开启 `pdb` 调试.

过程如图:

![错误的](https://images.gitee.com/uploads/images/2018/1202/155233_21138d27_1120068.png "debug_error.png")

注意到 `lotan_session.build_model(QualityScore, id=score.id)`, 在 `build` model 时，使用了 `QualityScore` 这个数据模型, 且根据 `id 这个字段来进行定义 `build`,  而该数据模型类定义的方法为:

```python
def resolve_by_id(self):
    return QualityScoreDAO.get_by_id(self.id)

# 其调用了 QualityScoreDAO 的 get_by_id 方法.

```

DAO 层的 get_by_id 方法:

```python
@classmethod
    def get_by_id(cls, id_):
        sql = db.tables.quality_score.select().where(
            db.tables.quality_score.c.id == id_
        )
        score = db.tables.execute(sql).fetchone()
        if score:
            return score
```

### 源码走读

查看 `lotan` 的  `build_model` 方法:

```python
    def build_model(self, model_cls, **kwargs):
        if isinstance(model_cls, six.string_types):
            model_cls = ModelManager().find_model_by_name(model_cls)
        if not model_cls:
            raise NameError("Model '%s' is not defiend." % model_cls)
        model = model_cls(**kwargs)
        model.attach_session(self)
        return model
```

前面的 `if` 只是简短的类型判断. 关键: `find_model_by_name` 这个方法, 该方法定义:

```python
# ModelManager 的类, 元类

class ModelManager(object):
    __metaclass__ = SingletonMeta

    def __init__(self):
        self._models_map = {}

    def register_model(self, model_cls):
        self._models_map[model_cls.__name__] = model_cls

    def unregister_model(self, model_cls):
        self._models_map.pop(model_cls.__name__)

    def find_model_by_name(self, name):
        return self._models_map.get(name)

    @property
    def models(self):
        return self._models_map.itervalues()
```

` __metaclass__ = SingletonMeta ` 表示创建 `ModelManager` 这个类对象时会采用 `SingletonMeta`类 来创建 `ModelManager` 类. 故, `SingletonMeta` 类在此处是 `ModelManager` 的元类。

### 问题所在

`__init__` 中初始化了 名为`_models_map` 的 `dict`, 从 `.get()` 方法基本可以确定需要传入的参数是一个 `dict` 类型.

进而返回查看: `return score`, 使用 `pdb` 查看该变量属性:

```bash
(Pdb) type(score)
<class 'sqlalchemy.engine.result.RowProxy'>
```

类型明显不对. 即问题所在 `return` 处。将返回改为 `dict(score)` 即可。

```bash
(Pdb) dict(score)
{'end_type': 'sdf', 'version': '2.0', 'created_at': datetime.datetime(2017, 11, 28, 18, 22, 36), 'updated_at': datetime.datetime(2017, 11, 28, 18, 22, 36), 'pa_name': 'mxxe-platform', 'score': 0.972, 'id': 122, 'origin_score': 102}
```

![正确结果](https://images.gitee.com/uploads/images/2018/1202/162815_953b1db0_1120068.png "success.png")

### 参考资料

`PDB` 具体用法, https://www.ibm.com/developerworks/cn/linux/l-cn-pythondebugger/index.html

`Python` 元类, http://blog.jobbole.com/21351/
