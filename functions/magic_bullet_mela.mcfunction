tp @s ^ ^ ^0.5 ~ ~
particle minecraft:small_flame_particle ~ ~ ~
execute positioned ~ ~-1 ~ run damage @a[r=1] 1 fire
execute positioned ~ ~-1 ~ run damage @e[family=mob,type=!armor_stand,r=1] 1 fire
execute unless block ^ ^ ^0.5 air run fill ^-1 ^-1 ^ ^1 ^1 ^-2 fire keep
execute positioned ~ ~-1 ~ if entity @a[r=1] run fill ^-1 ^-1 ^ ^1 ^1 ^-2 fire keep
execute positioned ~ ~-1 ~ if entity @e[family=mob,type=!armor_stand,r=1] run fill ^-1 ^-1 ^ ^1 ^1 ^-2 fire keep
execute unless entity @p[r=32] run tag @s add "!!remove"
execute unless block ~ ~ ~ air run tag @s add "!!remove"
execute positioned ~ ~-1 ~ if entity @a[r=1] run tag @s add "!!remove"
execute positioned ~ ~-1 ~ if entity @e[family=mob,type=!armor_stand,r=1] run tag @s add "!!remove"
playsound mob.blaze.shoot @a[r=32] ~ ~ ~ 1.0 1.0 0.0
tag @s add element_fire
