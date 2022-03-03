SET sql_safe_updates = FALSE;

USE defaultdb;
DROP DATABASE IF EXISTS til CASCADE;
CREATE DATABASE IF NOT EXISTS til;

USE til;

CREATE TABLE docs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title STRING NOT NULL,
    content STRING NOT NULL,
    tags STRING[],
    date_created DATE DEFAULT now()
);

INSERT INTO docs (title, content, tags) VALUES ('TIL 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at viverra velit. Integer at mauris ullamcorper nisi condimentum facilisis. Fusce purus justo, ullamcorper id ipsum et, scelerisque cursus dolor. Donec eros eros, pharetra sed tincidunt vitae, sodales sit amet orci. Duis vulputate hendrerit tincidunt. Etiam id maximus enim. Nunc vel ante urna. Donec faucibus arcu at enim mollis elementum. Donec in ultrices nisl, dapibus eleifend felis. Etiam finibus vehicula magna, eget convallis neque efficitur vel.', ARRAY['A', 'B', 'C']);
INSERT INTO docs (title, content, tags, date_created) VALUES ('TIL 2', '22222 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at viverra velit. Integer at mauris ullamcorper nisi condimentum facilisis. Fusce purus justo, ullamcorper id ipsum et, scelerisque cursus dolor. Donec eros eros, pharetra sed tincidunt vitae, sodales sit amet orci. Duis vulputate hendrerit tincidunt. Etiam id maximus enim. Nunc vel ante urna. Donec faucibus arcu at enim mollis elementum. Donec in ultrices nisl, dapibus eleifend felis. Etiam finibus vehicula magna, eget convallis neque efficitur vel.', ARRAY['A', 'D'], '2022-02-20T13:00:00.000Z');