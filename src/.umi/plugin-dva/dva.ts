// @ts-nocheck
import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from '/Users/ha/Desktop/vc-localize-clone/node_modules/dva-loading/dist/index.esm.js';
import { plugin, history } from '../core/umiExports';
import ModelAssessment0 from '/Users/ha/Desktop/vc-localize-clone/src/models/assessment.js';
import ModelCompare1 from '/Users/ha/Desktop/vc-localize-clone/src/models/compare.js';
import ModelEstate2 from '/Users/ha/Desktop/vc-localize-clone/src/models/estate.js';
import ModelFormRegister3 from '/Users/ha/Desktop/vc-localize-clone/src/models/formRegister.js';
import ModelGlobal4 from '/Users/ha/Desktop/vc-localize-clone/src/models/global.js';
import ModelLogin5 from '/Users/ha/Desktop/vc-localize-clone/src/models/login.js';
import ModelMobilemap6 from '/Users/ha/Desktop/vc-localize-clone/src/models/mobilemap.js';
import ModelSetting7 from '/Users/ha/Desktop/vc-localize-clone/src/models/setting.js';
import ModelUser8 from '/Users/ha/Desktop/vc-localize-clone/src/models/user.js';
import ModelModel9 from '/Users/ha/Desktop/vc-localize-clone/src/pages/map/model.js';

let app:any = null;

export function _onCreate(options = {}) {
  const runtimeDva = plugin.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    // @ts-ignore
    ...(typeof window !== 'undefined' && window.g_useSSR ? { initialState: window.g_initialProps } : {}),
    ...(options || {}),
  });
  
  app.use(createLoading());
  
  (runtimeDva.plugins || []).forEach((plugin:any) => {
    app.use(plugin);
  });
  app.model({ namespace: 'assessment', ...ModelAssessment0 });
app.model({ namespace: 'compare', ...ModelCompare1 });
app.model({ namespace: 'estate', ...ModelEstate2 });
app.model({ namespace: 'formRegister', ...ModelFormRegister3 });
app.model({ namespace: 'global', ...ModelGlobal4 });
app.model({ namespace: 'login', ...ModelLogin5 });
app.model({ namespace: 'mobilemap', ...ModelMobilemap6 });
app.model({ namespace: 'setting', ...ModelSetting7 });
app.model({ namespace: 'user', ...ModelUser8 });
app.model({ namespace: 'model', ...ModelModel9 });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  constructor(props: any) {
    super(props);
    // run only in client, avoid override server _onCreate()
    if (typeof window !== 'undefined') {
      _onCreate();
    }
  }

  componentWillUnmount() {
    let app = getApp();
    app._models.forEach((model:any) => {
      app.unmodel(model.namespace);
    });
    app._models = [];
    try {
      // 释放 app，for gc
      // immer 场景 app 是 read-only 的，这里 try catch 一下
      app = null;
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
