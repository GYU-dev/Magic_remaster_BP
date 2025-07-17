execute if score @s magic_system matches 30 as @p[r=3,tag=used_magic_player_heal] run effect @s instant_health 1 0 true
execute if score @s magic_system matches 30 run playsound item.trident.thunder @a[r=32] ~ ~ ~ 1.0 2.5
execute if score @s magic_system matches 30 run particle minecraft:heart_particle ~ ~ ~
execute if score @s magic_system = @p[r=3,tag=used_magic_player_heal] magic_system at @p[r=3,tag=used_magic_player_heal] run tp @s ~ ~ ~ ~ ~
scoreboard players remove @s magic_system 1
scoreboard players remove @p[r=3,tag=used_magic_player_heal] magic_system 1
execute if score @s magic_system matches 0 run tag @p[r=3,tag=used_magic_player_heal] remove used_magic_player_heal
tag @s[scores={magic_system=0}] add "!!remove"