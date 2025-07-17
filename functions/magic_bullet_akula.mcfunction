tp @s ^ ^ ^0.5 ~ ~
particle minecraft:egg_destroy_emitter ~ ~ ~
tp @a[r=2] ^ ^ ^-0.5
tp @e[family=mob,type=!armor_stand,r=2] ^ ^ ^-0.5
execute unless entity @p[r=32] run tag @s add "!!remove"
execute unless block ~ ~ ~ air run tag @s add "!!remove"
execute if score @s magic_system matches 0 run tag @s add "!!remove"
scoreboard players remove @s magic_system 1
playsound random.fizz @a[r=32] ~ ~ ~ 1.0 1.0 0.0
tag @s add element_water