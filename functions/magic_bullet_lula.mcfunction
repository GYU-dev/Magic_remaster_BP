scoreboard players remove @s magic_system 1
execute if score @s magic_system matches 0 if score @s magic_system = @p[tag=used_magic_player_lula,y=800,dy=500] magic_system as @p[tag=used_magic_player_lula] run effect @s resistance 15 255 true
execute if score @s magic_system matches 0 if score @s magic_system = @p[tag=used_magic_player_lula,y=800,dy=500] magic_system as @p[tag=used_magic_player_lula] run tp 0 800 0
execute if score @s magic_system matches 0 run tag @p[tag=used_magic_player_lula] remove used_magic_player_lula
