import {WatchChangeType} from './watch-change-type';
import {NgxKeyValue} from './ngx-key-value';
import {KeyValueChangeRecord} from '@angular/core';

/**
 * key/value监听器接口
 * 负责执行监听key/value值的变化
 */
export interface KvWatcher<V> {
  /**
   * 执行监听值的变化
   * @param value 监听的值
   * @param {(t: WatchChangeType, v: NgxKeyValue<V>) => void} afterChange 在值变化后的回调函数
   * @param {((t: WatchChangeType, r: KeyValueChangeRecord<string, V>) => void) | null} change 值的变化回调函数
   */
  watch(value: NgxKeyValue<V>,
    afterChange?: (v: NgxKeyValue<V>) => void,
    change?: ((t: WatchChangeType, r: KeyValueChangeRecord<string, V>) => void) | null
  ): void;
}
