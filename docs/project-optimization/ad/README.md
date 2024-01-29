# 投放任务文档

## 广告系列模块

## 广告组模块

### 应用/转化

#### 单次成效费用目标 (bid_amount)
广告系列赋能未开启
  - 成效目标 === VALUE(转化价值最大化)
    bid_amount === 0 (必等0) => 显示广告花费回报目标(roas_average_floor)
    roas_average_floor > 0  => bid_strategy === LOWEST_COST_WITH_MIN_ROAS
    roas_average_floor ===0  => bid_strategy === LOWEST_COST_WITHOUT_CAP
  - 成效目标 === 其他
    

<!-- bid_amount === 0
 - 广告系列赋能未开启 && 成效目标 === VALUE(转化价值最大化) && 
 - 广告系列赋能未开启 && 成效目标 === 其他  => bid_strategy === LOWEST_COST_WITHOUT_CAP(最高数量或价值)
 - 广告系列赋能开启 => 

bid_amount > 0
 - 广告系列赋能未开启 && 成效目标 === 其他  => bid_strategy(非必填) 默认COST_CAP(单次成效费用目标) -->

#### 竞价策略 (bid_strategy)
#### 广告花费回报目标 (roas_average_floor)

#### 计费方式

禁用规则
  - 成效目标 !== LINK_CLICKS (链接点击最大化/链接点击量最大化)
  - 成效目标 === LINK_CLICKS && 广告系列赋能开启 && 广告系列竞价策略 === COST_CAP (单次成效费用目标)

选项禁用规则
  - 链接点击量(单次点击费用) 成效目标 === LINK_CLICKS && 广告系列赋能未开启 && 单次成效费用目标 > 0


设置默认值规则 (展示次数 IMPRESSIONS) 
  - 切换成效目标时设置成默认值






<SideTitle :page="$page" />
