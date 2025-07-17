execute if score @s magic_system matches 26..30 run summon magic_remaster:magic_dummy ~ ~0.5 ~ ~ ~ minecraft:entity_spawned magic_bullet_noa
execute if score @s magic_system = @p[r=3,tag=used_magic_player_noa] magic_system at @p[r=3,tag=used_magic_player_noa] run tp @s ^ ^1 ^1 ~ ~
scoreboard players remove @s magic_system 1
scoreboard players remove @p[r=3,tag=used_magic_player_noa] magic_system 1
execute if score @s magic_system matches 0 run tag @p[r=3,tag=used_magic_player_noa] remove used_magic_player_noa
tag @s[scores={magic_system=0}] add "!!remove"