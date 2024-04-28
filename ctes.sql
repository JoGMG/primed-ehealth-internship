-- Use the database 'kym_db'
USE kym_db;

-- Define a Common Table Expression (CTE) named 'Movie_CTE'
-- This CTE selects the 'id' and 'title' from the 'movies' table
-- where 'id' is not null, and groups the results by 'id'
WITH Movie_CTE (id, title)
AS (
    SELECT id, title
    FROM movies
    WHERE id IS NOT NULL
    GROUP BY id
)

-- Main query
-- Select 'id' and 'title' from our CTE and 'content' from the 'reviews' table
-- Join the 'reviews' table with our CTE where 'movie_id' in 'reviews' matches 'id' in the CTE
-- Order the result by 'title'
SELECT M.id, M.title, R.content AS review
FROM reviews AS R
JOIN Movie_CTE AS M
ON R.movie_id = M.id
ORDER BY M.title;
