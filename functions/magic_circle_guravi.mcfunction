execute if score @s magic_system matches 20..180 run effect @a[r=10,tag=!used_magic_player_guravi] slowness 1 10 true
execute if score @s magic_system matches 20..180 as @a[r=10,tag=!used_magic_player_guravi] at @s if block ~ ~-0.5 ~ air run tp @s ~ ~-0.5 ~
execute if score @s magic_system matches 20..180 run effect @e[family=mob,type=!armor_stand,r=10] slowness 1 10 true
execute if score @s magic_system matches 20..180 as @e[family=mob,type=!armor_stand,r=10] at @s if block ~ ~-0.5 ~ air run tp @s ~ ~-0.5 ~
execute if score @s magic_system matches 180 run playsound mob.warden.sonic_boom @a[r=32] ~ ~ ~ 1.0 0.5
execute if score @s magic_system = @p[r=3,tag=used_magic_player_guravi] magic_system at @p[r=3,tag=used_magic_player_guravi] run tp @s ~ ~ ~
tp @s ~ ~ ~ ~5 ~
execute if score @s magic_system matches 20.. run particle minecraft:endrod ^ ^1 ^10
execute if score @s magic_system matches 20.. run particle minecraft:endrod ^ ^1 ^-10
scoreboard players remove @s magic_system 1
scoreboard players remove @p[r=3,tag=used_magic_player_guravi] magic_system 1
execute if score @s magic_system matches 0 run tag @p[r=3,tag=used_magic_player_guravi] remove used_magic_player_guravi
tag @s[scores={magic_system=0}] add "!!remove"