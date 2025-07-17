execute if score @s magic_system matches 90 run camerashake add @a[r=15] 0.5 3
execute if score @s magic_system matches 90 run playsound mob.warden.sonic_boom @a[r=32] ~ ~ ~ 1.0 0.5
execute if score @s magic_system matches 30..90 as @a[r=10,tag=!used_magic_player_jisin] at @s unless block ~ ~-0.5 ~ air run damage @s 1 fall
execute if score @s magic_system matches 30..90 as @e[family=mob,type=!armor_stand,r=10] at @s unless block ~ ~-0.5 ~ air run damage @s 1 fall
execute if score @s magic_system = @p[r=3,tag=used_magic_player_jisin] magic_system at @p[r=3,tag=used_magic_player_jisin] run tp @s ~ ~ ~ ~ ~
scoreboard players remove @s magic_system 1
scoreboard players remove @p[r=3,tag=used_magic_player_jisin] magic_system 1
execute if score @s magic_system matches 0 run tag @p[r=3,tag=used_magic_player_jisin] remove used_magic_player_jisin
tag @s[scores={magic_system=0}] add "!!remove"