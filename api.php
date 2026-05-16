<?php
header("Access-Control-Allow-Origin: *"); // to access React 
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    // to fetch regsterd data
    $sql = "SELECT * FROM trades ORDER BY trade_date DESC";
    $result = $conn->query($sql);
    $trades = array();
    
    while($row = $result->fetch_assoc()) {
        $trades[] = $row;
    }
    echo json_encode($trades);

} elseif ($method == 'POST') {
    // to insert new data
    $data = json_decode(file_get_contents("php://input"));
    
    $asset = $data->asset;
    $strategy = $data->strategy;
    $entry = $data->entry_price;
    $exit = $data->exit_price;
    $pnl = $data->pnl;

    $sql = "INSERT INTO trades (asset, strategy, entry_price, exit_price, pnl) 
            VALUES ('$asset', '$strategy', '$entry', '$exit', '$pnl')";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Trade added successfully!"]);
    } else {
        echo json_encode(["error" => "Error: " . $conn->error]);
    }
}
$conn->close();
?>