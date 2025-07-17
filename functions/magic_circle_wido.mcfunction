execute if score @s magic_system matches 8..10 run summon wind_charge_projectile ~ ~1 ~ ~ ~
execute if score @s magic_system matches 8..10 run tag @e[type=wind_charge_projectile,r=2] add magic_bullet_wido
execute if score @s magic_system = @p[r=3,tag=used_magic_player_wido] magic_system at @p[r=2,tag=used_magic_player_wido] run tp @s ~ ~ ~ ~ ~
scoreboard players remove @s magic_system 1
scoreboard players remove @p[r=3,tag=used_magic_player_wido] magic_system 1
execute if score @s magic_system matches 0 run tag @p[r=3,tag=used_magic_player_wido] remove used_magic_player_wido
tag @s[scores={magic_system=0}] add "!!remove"
scoreboard players operation @e[type=wind_charge_projectile,tag=magic_bullet_wido,r=2] magic_system = @s magic_system
