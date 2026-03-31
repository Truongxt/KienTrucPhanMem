-- Initialize PostgreSQL database
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (name, email) VALUES 
    ('Docker User', 'docker@example.com'),
    ('Test User', 'test@example.com');

INSERT INTO posts (user_id, title, content) VALUES
    (1, 'Welcome to Docker', 'This is a test post'),
    (2, 'PostgreSQL Tutorial', 'Learning PostgreSQL with Docker');

-- Create a view
CREATE VIEW user_post_count AS
SELECT u.id, u.name, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.name;

-- Grant permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO docker_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO docker_user;
