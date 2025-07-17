execute if score @s magic_system matches 30 as @p[r=3,tag=used_magic_player_boluto] run effect @s speed 1 10 true
execute if score @s magic_system matches 30 as @p[r=3,tag=used_magic_player_boluto] run effect @s jump_boost 1 10 true
execute if score @s magic_system matches 30 run playsound item.trident.thunder @a[r=32] ~ ~ ~ 1.0 2.5
execute if score @s magic_system matches 10..30 if score @s magic_system = @p[r=3,tag=used_magic_player_boluto] magic_system at @p[r=3,tag=used_magic_player_boluto] run particle minecraft:electric_spark_particle ~ ~0.5 ~
execute if score @s magic_system = @p[r=3,tag=used_magic_player_boluto] magic_system at @p[r=3,tag=used_magic_player_boluto] run tp @s ~ ~ ~ ~ ~
scoreboard players remove @s magic_system 1
scoreboard players remove @p[r=3,tag=used_magic_player_boluto] magic_system 1
execute if score @s magic_system matches 0 run tag @p[r=3,tag=used_magic_player_boluto] remove used_magic_player_boluto
tag @s[scores={magic_system=0}] add "!!remove"