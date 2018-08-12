## ngx-watcher

基于angular6实现数据变化监听的service

### 安装

```
npm install ngx-watcher --save
```

### 配置

对于angular6项目不需要配置, Ok!

对于angular4,angular5 配置`app.module.ts`文件

```typescript
@NgModule({
  ...
  providers: [NgxWatcherService],
  ...
})
export class AppModule { }

```

### 使用

```typescript
 import {KvWatcher, IterWatcher, NgxWatcherService} from 'ngx-watcher';

 @Component({...})
  export class TestComponent implements DoCheck {
 
   private kvWatcher: KvWatcher<any>;
   private iterWatcher: IterWatcher<any>;
 
   value = {}; // keyValue类型
   array = []; // 可迭代类型
 
   constructor(private service: NgxWatcherService) {
     this.kvWatcher = service.of(this.value);
     this.iterWatcher = service.ofIter(this.array);
   }
 
   ngDoCheck(): void {
     this.kvWatcher.watch(
       this.value,
       v => console.log(`change after value:`, v),
       (t, v) => console.log(`changed value: WatchChangeType=${t} ${v.key} ${v.previousValue} ${v.currentValue}`)
     );
 
     this.iterWatcher.watch(
       this.array,
       v => console.log(`change after value:`, v),
       (t, v) => console.log(`changed value: WatchChangeType=${t} ${v.currentIndex} ${v.item} ${v.previousIndex} ${v.trackById}`)
     );
   }
 }
```


## 关于本组件项目

本项目使用[Angular CLI](https://github.com/angular/angular-cli) version 6.0.7生成

### 运行项目

使用 `ng serve`启动开发服务. 然后打开浏览器输入地址`http://localhost:4200/` 即可

### 编译组件

```
npm run build:lib
```
生成编译后的文件在dist/ngx-watcher目录

### 运行效果

![运行效果](https://github.com/m310851010/ngx-watcher/blob/master/run.gif "运行效果")

### LICENSE

Apache-2.0
