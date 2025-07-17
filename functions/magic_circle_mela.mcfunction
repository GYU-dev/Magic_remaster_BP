execute if score @s magic_system matches 30 run summon magic_remaster:magic_dummy ~ ~0.5 ~ ~ ~ minecraft:entity_spawned magic_bullet_mela
execute if score @s magic_system = @p[r=3,tag=used_magic_player_mela] magic_system at @p[r=3,tag=used_magic_player_mela] run tp @s ^ ^1 ^1 ~ ~
execute if score @s magic_system matches 50 run playsound note.bit @a[r=32] ~ ~ ~ 1.0 0.707107 0.0
execute if score @s magic_system matches 48 run playsound note.bit @a[r=32] ~ ~ ~ 1.0 0.840896 0.0
execute if score @s magic_system matches 46 run playsound note.bit @a[r=32] ~ ~ ~ 1.0 0.749154 0.0
execute if score @s magic_system matches 44 run playsound note.bit @a[r=32] ~ ~ ~ 1.0 0.890899 0.0
execute if score @s magic_system matches 42 run playsound note.bit @a[r=32] ~ ~ ~ 1.0 0.793701 0.0
execute if score @s magic_system matches 40 run playsound note.bit @a[r=32] ~ ~ ~ 1.0 0.943874 0.0
execute if score @s magic_system matches 38 run playsound note.bit @a[r=32] ~ ~ ~ 1.0 1.0 0.0
scoreboard players remove @s magic_system 1
scoreboard players remove @p[r=3,tag=used_magic_player_mela] magic_system 1
execute if score @s magic_system matches 0 run tag @p[r=3,tag=used_magic_player_mela] remove used_magic_player_mela
tag @s[scores={magic_system=0}] add "!!remove"