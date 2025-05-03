CREATE TABLE group_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('player', 'coach')),
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (group_id, user_id)
);

CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  color VARCHAR(7),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  message TEXT,
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  read_at TIMESTAMP
);

CREATE TABLE user_profile (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  name TEXT,
  surname TEXT,
  nickname TEXT,
  position TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE attendance_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  group_id UUID REFERENCES groups(id),
  date DATE NOT NULL,
  present BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE player_stats_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  context TEXT,
  serve_net INTEGER,
  serve_out INTEGER, 
  serve_ace INTEGER, 
  attack_net INTEGER, 
  attack_out INTEGER, 
  attack_success INTEGER, 
  block_success INTEGER, 
  dig_success INTEGER,   
  receive_good INTEGER,  
  receive_ok INTEGER,    
  receive_bad INTEGER,   
  receive_lost INTEGER,  
  set_good INTEGER,      
  set_ok INTEGER,        
  set_bad INTEGER,       
  set_lost INTEGER,      
  training_date DATE NOT NULL,    
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_profile_stats (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  avg_serve_net INTEGER,
  avg_serve_out INTEGER,
  avg_serve_ace INTEGER,
  avg_attack_net INTEGER,
  avg_attack_out INTEGER,
  avg_attack_success INTEGER,
  avg_block_success INTEGER,
  avg_dig_success INTEGER,
  avg_receive_good INTEGER,
  avg_receive_ok INTEGER,
  avg_receive_bad INTEGER,
  avg_receive_lost INTEGER,
  avg_set_good INTEGER,
  avg_set_ok INTEGER,
  avg_set_bad INTEGER,
  avg_set_lost INTEGER,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_user_profile_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE user_profile_stats
  SET
    avg_serve_net = COALESCE((
      SELECT ROUND(AVG(serve_net)) FROM player_stats_entries WHERE user_id = NEW.user_id
    ), 0),
    avg_serve_out = COALESCE((
      SELECT ROUND(AVG(serve_out)) FROM player_stats_entries WHERE user_id = NEW.user_id
    ), 0),
    avg_serve_ace = COALESCE((
      SELECT ROUND(AVG(serve_ace)) FROM player_stats_entries WHERE user_id = NEW.user_id
    ), 0),
    avg_attack_net = COALESCE((
      SELECT ROUND(AVG(attack_net)) FROM player_stats_entries WHERE user_id = NEW.user_id
    ), 0),
    avg_attack_out = COALESCE((
      SELECT ROUND(AVG(attack_out)) FROM player_stats_entries WHERE user_id = NEW.user_id
    ), 0),
    avg_attack_success = COALESCE((
      SELECT ROUND(AVG(attack_success)) FROM player_stats_entries WHERE user_id = NEW.user_id
    ), 0),
    avg_block_success = COALESCE((
      SELECT ROUND(AVG(block_success)) FROM player_stats_entries WHERE user_id = NEW.user_id
    ), 0),
    avg_dig_success = COALESCE((
      SELECT ROUND(AVG(dig_success)) FROM player_stats_entries WHERE user_id = NEW.user_id
    ), 0),
    avg_receive_good = COALESCE((
      SELECT ROUND(AVG(receive_good)) FROM player_stats_entries WHERE user_id = NEW.user_id
    ), 0),
    avg_receive_ok = COALESCE((
      SELECT ROUND(AVG(receive_ok)) FROM player_stats_entries WHERE user_id = NEW.user_id
    ), 0),
    avg_receive_bad = COALESCE((
      SELECT ROUND(AVG(receive_bad)) FROM player_stats_entries WHERE user_id = NEW.user_id
    ), 0),
    avg_receive_lost = COALESCE((
      SELECT ROUND(AVG(receive_lost)) FROM player_stats_entries WHERE user_id = NEW.user_id
    ), 0),
    avg_set_good = COALESCE((
      SELECT ROUND(AVG(set_good)) FROM player_stats_entries WHERE user_id = NEW.user_id
    ), 0),
    avg_set_ok = COALESCE((
      SELECT ROUND(AVG(set_ok)) FROM player_stats_entries WHERE user_id = NEW.user_id
    ), 0),
    avg_set_bad = COALESCE((
      SELECT ROUND(AVG(set_bad)) FROM player_stats_entries WHERE user_id = NEW.user_id
    ), 0),
    avg_set_lost = COALESCE((
      SELECT ROUND(AVG(set_lost)) FROM player_stats_entries WHERE user_id = NEW.user_id
    ), 0),
    attendance_percent = (
      SELECT ROUND(AVG(CASE WHEN present THEN 1 ELSE 0 END) * 100, 2)
      FROM attendance_entries
      WHERE user_id = NEW.user_id
    ),
    updated_at = NOW()
  WHERE user_id = NEW.user_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_profile_stats
AFTER INSERT OR UPDATE OR DELETE
ON player_stats_entries
FOR EACH ROW
EXECUTE FUNCTION update_user_profile_stats();

CREATE TRIGGER trigger_update_user_profile_stats_attendance
AFTER INSERT OR UPDATE OR DELETE
ON attendance_entries
FOR EACH ROW
EXECUTE FUNCTION update_user_profile_stats();