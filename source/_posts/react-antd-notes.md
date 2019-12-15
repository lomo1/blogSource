---
title: react/antd notes
date: 2018-09-01 22:33:15
tags: [react, js]
categories: program
description: react/antd pro使用小记
---

## Ant Design Pro使用小记

### 背景

> 从Angular变更到React技术栈...

吾队, 统一使用`React`了, 别问为什么, 我想了好几天也没搞明白.

写吧写吧.

如今, 就一个人好好搬砖吧.

本次项目直接使用`antd pro`, 阿里的那一套......

> https://pro.ant.design/


#### 初始化工作

> 由于本次直接使用的是 `ali` 的antd pro 中台解决方案. 基本相当于二次开发......

安装脚手架
```bash
npm install dva-cli -g
dva -v
dva-cli version 0.9.2

# 创建项目
dva new
# ... ...
```

本地运行:

```bash
cd projectName
npm start
# http://localhost:8000/

# build prod
npm build
```

#### 项目目录解析

```bash
# 未包含隐藏.xx相关配置文件
.
├── appveyor.yml
├── jest.config.js
├── mock
├── node_modules
├── package-lock.json
├── package.json
├── public
├── src
└── tests
```

1. `mock` 目录下都是mock数据用的文件

2. `public` 目录下存放静态资源文件

3. `src` 项目的源码

4. `tests` 单元测试代码

关于以 `.` 开头的隐藏文件说明:

1. `.roadhogrc.mock.js` 该文件主要是用来在本地`mock`数据时 拦截、代理本地接口请求用的. 具体使用, 后续会讲到.
2. `.webpackrc.js` webpack打包配置相关设定, 可以看到已经将`antd`这个库设置为打包进去了, 使用`react`官方脚手架，创建时 时需要人为配置.
3. `.eslint.js`, `.babelrc.ks` 都是相关配置文件, 暂不需要过度关注和修改.


### src目录说明

```bash
.
├── assets
├── common
├── components
├── e2e
├── index.ejs
├── index.js
├── index.less
├── layouts
├── models
├── polyfill.js
├── rollbar.js
├── router.js
├── routes
├── services
├── theme.js
└── utils
```

1. `assets`文件夹, 静态资源存放
2. `common`文件夹, 公共的, 按照ant pro设定就2个文件
3. `components`文件夹, **纯**UI组件
4. `e2e`, end 2 end 测试
5. `models` 文件夹, 存放模型Model(和数据操作密切相关的)文件, 和`dva`密切关联.
6. `utils`, 一些常用函数工具类库
7. `services`, 存放一些接口请求相关的封装
8. `routes`文件夹, 存放页面相关的route component(不是纯UI组件, 其包含了一些具体的页面操作交互、方法定义、周期钩子函数`componentDidMount`等).
9. `layouts`, 整个页面的布局设定
10. `polyfill.js`, 兼容性设置
11. `index.js`, 整个应用入口
12. 其它暂时不用管......



### 项目示例

需求: 需要展示一个 `product` 列表, 并在左侧导航栏的二级菜单下有一个入口.

#### menu配置

1. 菜单配置, 添加入口, 修改`src/common/menu.js`文件.
找到 `path: 'management'` 关键字, 在 `children`下按照同样的语法格式添加即可. 该语法和 `Angular` 中的路由配置类似.

```js
path: 'management',
    children: [
      {
        name: '产品线',
        path: 'product_line',
      },
    ],
```

#### 路由配置

2. 添加路由配置, 修改`src/common/router.js`文件. 在 `routerConfig` 对象找个合适的位置按照同样的语法添加即可.

```js
'/management/product_line': {
      component: dynamicWrapper(app, ['productline'], () =>
        import('../routes/Management/ProductLine/ProductLine')
      ),
    },
```
> 注意, `dynamicWrapper` 方法的第二个数组参数, 通常用来设置该路由组件(即ProductLine)所对应的Model.

#### view层router component组件

3. 添加该`View`层的路由组件
```js
<!-- 页面视图 -->
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Button, Form, Table, Popconfirm, Divider, message } from 'antd';

import ProductLineModal from './ProductLineModal';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from './ProductLine.less';

@connect(({ productline, loading }) => ({
  productline,
  loading: loading.effects['productline/fetch'],
}))
@Form.create()
export default class ProductLine extends PureComponent {
  state = {
    modalVisible: false,
    mode: null,
    currentRow: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'productline/fetch',
    });
  }

  handleModalVisible = (flag, row = {}, mode = 'create') => {
    this.setState({
      modalVisible: !!flag,
      mode,
      currentRow: row,
    });
  };

  confirmDelete = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productline/remove',
      payload: {
        deleteData: fields,
      },
    });
    console.log('删除的内容: ');
    console.log(fields);

    message.success('删除成功');
    this.setState({
      modalVisible: false,
    });
  };
  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productline/update',
      payload: {
        postData: fields,
      },
    });
    console.log('更新的内容: ');
    console.log(fields);
    // console.log( fields.desc); // undefined

    message.success('更新成功');
    this.setState({
      modalVisible: false,
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'productline/add',
      payload: {
        postData: fields,
      },
    });
    console.log('新增的内容: ');
    console.log(fields);
    // console.log( fields.desc); // undefined

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const {
      productline: {
        list: { list: dataSource },
      },
      loading,
    } = this.props;
    const { modalVisible, mode, currentRow } = this.state;

    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        align: 'center',
      },
      {
        title: '所属 PA',
        dataIndex: 'pa',
        align: 'center',
      },
      {
        title: '描述',
        dataIndex: 'description',
        align: 'center',
      },
      {
        title: '操作',
        align: 'center',
        render: (text, record) => (
          <Fragment>
            <Button
              type="primary"
              icon="edit"
              onClick={() => this.handleModalVisible(true, record, 'update')}
            />
            编辑
            <Divider type="vertical" />
            <Popconfirm
              title="确认删除?"
              okText="确认"
              cancelText="取消"
              onConfirm={() => this.confirmDelete(record)}
            >
              <Button type="danger" icon="delete" />
              删除
            </Popconfirm>
          </Fragment>
        ),
      },
    ];

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleUpdate: this.handleUpdate,
      handleModalVisible: this.handleModalVisible,
    };

    const parentData = {
      modalVisible,
      mode,
      values: currentRow,
    };

    return (
      <PageHeaderLayout title="产品线">
        <Card bordered>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
            </div>

            <Table
              rowKey="id"
              loading={loading}
              dataSource={dataSource}
              columns={columns}
              bordered
            />
          </div>
        </Card>
        <ProductLineModal {...parentMethods} {...parentData} />
      </PageHeaderLayout>
    );
  }
}
```

模态框的简单封装: 
```js
<!-- 上面👆那个页面用到的模态框封装 -->
import React, { PureComponent } from 'react';
import { Form, Input, Select, Modal } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

const areas = ['社区', '商业', '大学', '智能工具', '基础架构'];

@Form.create()
export default class ProductLineModal extends PureComponent {
  componentDidUpdate(prevProps) {
    if (prevProps.modalVisible === false && this.props.modalVisible === true) {
      const {
        form,
        values: { name, pa, description },
      } = this.props;
      form.setFieldsValue({
        name,
        pa,
        description,
      });
    }
  }

  okHandle = () => {
    console.log(this.props.mode); // 'create', 'update'
    const { form, handleAdd, handleUpdate } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (this.props.mode === 'update') {
        handleUpdate(fieldsValue);
      } else {
        handleAdd(fieldsValue);
      }
    });
  };

  render() {
    const { form, modalVisible, handleModalVisible, mode } = this.props;
    const title = `${mode === 'create' ? '新建' : '编辑'}产品线`;

    return (
      <Modal
        title={title}
        visible={modalVisible}
        onOk={this.okHandle}
        onCancel={() => handleModalVisible()}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="产品线名称">
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入产品线名称' }],
          })(<Input placeholder="请输入产品线名称" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="所属 PA">
          {form.getFieldDecorator('pa', {
            rules: [{ required: true, message: '请选择所属 PA' }],
          })(
            <Select placeholder="请选择所属 PA" style={{ width: '100%' }}>
              {areas.map(area => {
                return (
                  <Option key={area} value={area}>
                    {area}
                  </Option>
                );
              })}
            </Select>
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
          {form.getFieldDecorator('description', {
            rules: [{ required: true, message: '请输入描述' }],
          })(<TextArea rows={3} />)}
        </FormItem>
      </Modal>
    );
  }
}
```

#### view层router component组件对应的model

4. 通信

针对上述3中的`route component`组件, 发现其中有几个方法以及与接口`API`交互的方法.

第一个: 进入当前页面路由后, 初始化加载的数据. 在 `ProductLine` 类中可以看到:

```js
componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'productline/fetch',
    });
  }
```
> 这是 `React` 提供的生命周期钩子函数, `render` 渲染到 `DOM` 时就会自动触发该钩子函数, 从而发起请求`fetch`; 具体写法: `model的namespace/方法名`.


在类中调用该接口请求, 另一个必须的依赖就是 `dva` (阿里基于redux + react-router + redux-saga 等库的轻量封装). 使用 `connect` 连接到该组件的 `model`

该组件的model如下:
```js
import {
  queryProductLine,
  addNewProducLine,
  updateProductLine,
  removeProductLine,
} from '../services/productline';

export default {
  namespace: 'productline',

  state: {
    list: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryProductLine);
      yield put({
        type: 'saveProductLine',
        payload: response,
      });
    },
    // 添加新的产品线
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addNewProducLine, payload);
      console.log('接收到的payload:');
      console.log(payload);
      // 请求发出后，暂不更新数据，模拟接口返回的数据不是个list 会导致view重新渲染为空白列表 ~~
      yield put({
        type: 'saveProductLine',
        payload: response,
      });
      if (callback) callback();
    },

    // 修改某条产品线的信息
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateProductLine, payload);
      // console.log('接收要修改的的payload:');
      // console.log(payload);
      // 请求发出后，暂不更新数据，模拟接口返回的数据不是个list 会导致view重新渲染为空白列表 ~~
      yield put({
        type: 'saveProductLine',
        payload: response,
      });
      if (callback) callback();
    },

    // 删除某条产品线
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeProductLine, payload);
      // console.log('接收要删除的的payload:');
      // console.log(payload);
      yield put({
        type: 'saveProductLine',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    saveProductLine(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
```

> 可以看到 `view` 层的 `router component` 组件调用了其对用的 `model` 里封装的方法. 但是实际的接口地址在哪里呢? 在下面👇


#### 接口services层封装

> 在上面的第4步中可以看到该 `model` 从 `services` 文件夹下的 `productline` 中导入了几个方法.

接口 `service` 如下:

```js
import request from '../utils/request';

export async function queryProductLine() {
  return request('/api/productline');
}

// 添加新product line
export async function addNewProducLine(params) {
  return request('/api/productlinepost', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

// 修改product line 信息
export async function updateProductLine(params) {
  return request('api/productlineput', {
    method: 'PUT',
    body: {
      ...params,
      method: 'put',
    },
  });
}

// 删除product line
export async function removeProductLine(params) {
  return request('api/productlinedelete', {
    method: 'DELETE',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

```
> 这里配置的URL 都是本地mock的, 默认是被本地mock接口拦截的.

至此, 整个数据流向和API请求使用, 按照上面的步骤 一步步下来 就很清晰了.


### 数据流

> Ant Design Pro 内置使用的是 `dva`.

对照此图即可 明了.

> 应用的数据流向(和API交互过程)

<div align="center">
  <img src="https://images.gitee.com/uploads/images/2018/0902/170752_1136de9e_1120068.png">
</div>


#### 数据流向

Action:
	Action是把数据从应用(如：用户输入、点击事件触发的数据、或是从接口请求获取的数据) 传递到store的一个载体。
	
	Action本质上是JS 普通对象。约定：Action内必须有一个字符串类的type 字段，用来表示将要执行的动作。
  一般/多数情况下，type会被定义成字符串常量；
	
Reducer:
	指定 应用状态的变化如何响应actions并发送到store（actions只描述有事情发生这一事实，没有描述应用如何更新state）；
	
	Reducer是个纯函数，主要作用：接受旧的state和action，返回新的state。
	
	Redux应用中, 所有的state都被保存在一个单一对象中。
	
	所以，reducer函数中 只是单纯进行计算(返回新的state)，没有API请求、没有变量修改、
	
Store:
Store就是把action和reducer联系到一起的对象。


#### React简单说明

> React 并不是Web应用的完整解决方案, 只是DOM的抽象层.

> React中值传递 都是向下传递的、单向的; 只能从父级 流向 子级.

> 组件声明规范: 无论是函数方式还是ES6中的class方式声明组件, 组件的命名规范: 首字母必须大写!

#### dva 说明

`dva` 是alibaba基于 `redux` + `react-router` + `redux-saga` 的一层轻量封装.


#### 关于Redux

> Redux和react没有 什么直接关系.

> Redux不仅支持react, 也支持angular、ember、jQuery、纯JS.


#### 关于Andt Pro

Ant Design of React 只是一个React相关的组件库。类似angular相关的UI库 ng-zorro.  而 Ant Design Pro相当于一个更上层的应用/模板，协助快速开发出应用。



### 相关资料

#### 关于 `dva` 使用: 

官方: 
https://dvajs.com/guide/


练习:
https://gitee.com/lomospace/dva-sample

#### React

> Google即可.

#### Ant Design Pro

官方: 
https://pro.ant.design/

练习:
https://gitee.com/lomospace/antPro

#### Redux

Doc(中文)
https://cn.redux.js.org/

视频(英文)
https://egghead.io/lessons/

#### React 脚手架

官方:
https://github.com/facebook/create-react-app

dva系:

```bash
# install
npm install dva-cli -g

# create
dva new projectName

cd projetName

# local run
npm start
```

https://dvajs.com/guide/getting-started.html#%E5%AE%89%E8%A3%85-dva-cli