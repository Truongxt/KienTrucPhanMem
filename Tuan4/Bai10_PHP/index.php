<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP in Docker</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        .container {
            text-align: center;
            background: white;
            padding: 50px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        h1 {
            color: #333;
            margin: 0;
        }
        p {
            color: #666;
            margin: 10px 0 0 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello, Docker with PHP!</h1>
        <p><?php echo "PHP Version: " . phpversion(); ?></p>
        <p>Running on Apache 2.4</p>
        <p><?php echo "Current time: " . date('Y-m-d H:i:s'); ?></p>
    </div>
</body>
</html>
