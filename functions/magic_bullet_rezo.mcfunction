tp @s ^ ^ ^2 ~ ~
particle minecraft:sonic_explosion ~ ~ ~
damage @a[r=2,tag=!used_magic_player_rezo] 10 sonic_boom
damage @e[family=mob,type=!armor_stand,r=2] 10 sonic_boom
execute unless entity @p[r=32,tag=used_magic_player_rezo] run tag @s add "!!remove"
execute if score @s magic_system matches 0 run tag @s add "!!remove"
scoreboard players remove @s magic_system 1
playsound mob.warden.sonic_boom @a[r=32] ~ ~ ~ 1.0 0.5
tag @s add element_sound