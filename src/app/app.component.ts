import {Component, DoCheck} from '@angular/core';
import {NgxWatcherService} from '../../projects/ngx-watcher/src/lib/ngx-watch.service';
import {KvWatcher} from '../../projects/ngx-watcher/src/lib/kv-watcher';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  obj = {name: '1', level: 0};
  testName;
  level;
  kvWatcher: KvWatcher<string | number>;
  constructor(private watcher: NgxWatcherService) {
    this.kvWatcher = watcher.of(this.obj);
  }
  ngDoCheck(): void {
    this.kvWatcher.watch(
      this.obj,
      v => {
      this.testName = v.name;
      this.level = v.level;
      console.log(`change after value:`, v);
      },
      (t, v) => console.log(`changed value: WatchChangeType=${t} ${v.key} ${v.previousValue} ${v.currentValue}`)
    );
  }
}
