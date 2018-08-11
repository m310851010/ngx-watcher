import {
  Injectable, IterableDiffer,
  IterableDiffers,
  KeyValueChangeRecord,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  TrackByFunction
} from '@angular/core';
import {NgxKeyValue} from './ngx-key-value';
import {IterableChangeRecord, IterableChanges} from '@angular/core/src/change_detection/differs/iterable_differs';
import {WatchChangeType} from './watch-change-type';
import {KvWatcher} from './kv-watcher';
import {IterWatcher} from './iter-watcher';
import {NgxIterable} from './ngx-iterable';

@Injectable({
  providedIn: 'root'
})
/**
 * 数据监听器,用来监听数据变化
 * @example
 * @Component({...})
 export class TestComponent implements DoCheck {

  private kvWatcher: KvWatcher<any>;
  private iterWatcher: IterWatcher<any>;

  value = {}; // keyValue类型
  array = []; // 可迭代类型

  constructor(private watcher: NgxWatcherService) {
    this.kvWatcher = watcher.of(this.value);
    this.iterWatcher = watcher.ofIter(this.array);
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
 */
export class NgxWatcherService {

  /**
   * 构造WatcherService
   * @param {KeyValueDiffers} kvDiffers key/value Differ
   * @param {IterableDiffers} iterDiffers 迭代器 Differ
   */
  constructor(private kvDiffers: KeyValueDiffers, private iterDiffers: IterableDiffers) {
  }

  /**
   * 创建一个Watcher对象
   * @param {V} value
   * @param {WatchType} watchType 监听的类型,k/v数据或可迭代数据
   * @param {TrackByFunction<V>} trackByFn 针对可迭代数据使用TrackByFunction
   * @returns {KvWatcher<V>}
   */
  of<V>(value: NgxKeyValue<V>): KvWatcher<V> {
    return new DefaultKvWatcher(value, this.kvDiffers.find(value).create());
  }

  /**
   * 创建一个Watcher对象
   * @param {V} value
   * @param {WatchType} watchType 监听的类型,k/v数据或可迭代数据
   * @param {TrackByFunction<V>} trackByFn 针对可迭代数据使用TrackByFunction
   * @returns {KvWatcher<V>}
   */
  ofIter<V>(value: NgxIterable<V>, trackByFn?: TrackByFunction<V>): IterWatcher<V> {
    return new DefaultIterWatcher(value, this.iterDiffers.find(value).create(trackByFn));
  }
}

/**
 * 默认的Key/value监听器监听器
 */
class DefaultKvWatcher<V> implements KvWatcher<V> {
  constructor(private value: NgxKeyValue<V>, private differ: KeyValueDiffer<string, V>) {
  }

  watch(value: NgxKeyValue<V>,
        afterChange?: (v: NgxKeyValue<V>) => void,
        change?: ((t: WatchChangeType, r: KeyValueChangeRecord<string, V>) => void) | null
       ): void {
    const changes: KeyValueChanges<string, V> | null = this.differ.diff(value);
    if (!changes) {
      return;
    }
    if (change) {
      changes.forEachChangedItem((r: KeyValueChangeRecord<string, V>) => change(WatchChangeType.CHANGE, r));
      changes.forEachAddedItem((r: KeyValueChangeRecord<string, V>) => change(WatchChangeType.ADD, r));
      changes.forEachRemovedItem((r: KeyValueChangeRecord<string, V>) => change(WatchChangeType.REMOVE, r));
    }
    if (afterChange) {
      afterChange(value);
    }
  }
}

/**
 * 默认的Key/value监听器监听器
 */
class DefaultIterWatcher<V> implements IterWatcher<V> {
  constructor(private value: NgxIterable<V>, private differ: IterableDiffer<V>) {
  }

  watch(
    value: NgxIterable<V>,
    afterChange?: (v: NgxIterable<V>) => void,
    change?: ((t: WatchChangeType, r: IterableChangeRecord<V>) => void) | null
    ): void {
    const changes: IterableChanges<V> | null = this.differ.diff(value);
    if (!changes) {
      return;
    }
    if (change) {
      changes.forEachIdentityChange((r: IterableChangeRecord<V>) => change(WatchChangeType.CHANGE, r));
      changes.forEachAddedItem((r: IterableChangeRecord<V>) => change(WatchChangeType.ADD, r));
      changes.forEachRemovedItem((r: IterableChangeRecord<V>) => change(WatchChangeType.REMOVE, r));
    }
    if (afterChange) {
      afterChange(value);
    }
  }
}



