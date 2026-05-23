# Data Schema

## games
All created games

| Column Name | Value | Notes|
|:----: |:----:|:-----:|
| ID | UUID | Primary Key (universal) |
| game_id | UUID | |
| name | TEXT||
| options| JSONB ||


## player_records
| Column Name | Value | Notes|
|:----: |:----:|:-----:|
| ID | UUID | Primary Key (universal) |
| user_id | UUID| |
| name | TEXT| |
| game_id | UUID| |
| score | INT | Number of correct guesses|


## rounds
| Column Name | Value | Notes|
|:----: |:----:|:-----:|
| ID | UUID | Primary Key (universal) |
| game_id | UUID | |
| round_num | UUID||
| correct_option | TEXT ||


## predictions
| Column Name | Value | Notes|
|:----: |:----:|:-----:|
| ID | UUID | Primary Key (universal) |
| game_id | UUID | |
| user_id | UUID | |
| round_num| UUID | |
| pred_option_| TEXT| |