import {WatchChangeType} from './watch-change-type';
import {IterableChangeRecord} from '@angular/core/src/change_detection/differs/iterable_differs';
import {NgxIterable} from './ngx-iterable';

/**
 * 迭代器监听器接口
 * 负责执行监听可迭代值的变化
 */
export interface IterWatcher<V> {
  /**
   * 执行监听值的变化
   * @param value 监听的新值
   * @param {((t: WatchChangeType, r: IterableChangeRecord<V>) => void) | null} afterChange 值的变化回调函数
   * @param {(v: NgxIterable<V>) => void} change 在值变化开始前的回调函数
   */
  watch(
    value: NgxIterable<V>,
    afterChange?: (v: NgxIterable<V>) => void,
    change?: ((t: WatchChangeType, r: IterableChangeRecord<V>) => void) | null
    ): void;
}
