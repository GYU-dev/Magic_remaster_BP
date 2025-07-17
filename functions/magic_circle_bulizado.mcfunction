execute if score @s magic_system matches 50 run summon magic_remaster:magic_dummy ~ ~0.5 ~ ~ ~ minecraft:entity_spawned magic_bullet_bulizado
execute if score @s magic_system = @p[r=3,tag=used_magic_player_bulizado] magic_system at @p[r=3,tag=used_magic_player_bulizado] run tp @s ^ ^1 ^1 ~ ~
scoreboard players remove @s magic_system 1
scoreboard players remove @p[r=3,tag=used_magic_player_bulizado] magic_system 1
execute if score @s magic_system matches 0 run tag @p[r=3,tag=used_magic_player_bulizado] remove used_magic_player_bulizado
tag @s[scores={magic_system=0}] add "!!remove"
scoreboard players operation @e[type=magic_remaster:magic_dummy,name=magic_bullet_bulizado,r=0.5,scores={magic_system=!0..}] magic_system = @s magic_system