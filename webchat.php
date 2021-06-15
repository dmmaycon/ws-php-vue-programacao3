<?php

use Ds\Map;
use Ds\Set;
use Ratchet\ConnectionInterface;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\MessageComponentInterface;
use Ratchet\WebSocket\WsServer;

require 'vendor/autoload.php';

$chatComponent = new class implements MessageComponentInterface {
    private $connections;

    public function __construct()
    {
        $this->connections = new Set();
    }

    public function onOpen(ConnectionInterface $conn) 
    {
        $this->connections[] = $conn;
        echo "Quantidade de conexões: " . $this->connections->count() . PHP_EOL;
    }

    public function onMessage(ConnectionInterface $from, $msg) 
    {
        echo "Evento on message" . PHP_EOL;
        foreach ($this->connections as $conn) {
            if ($conn !== $from) {
                $conn->send($msg);
            }
        }
    }

    public function onClose(ConnectionInterface $conn) 
    {
        echo "Encerrou a conexão" . PHP_EOL;
    }

    public function onError(ConnectionInterface $conn, \Exception $e) 
    {
    }
};

$server = IoServer::factory(
    new HttpServer(
        new WsServer($chatComponent)
    ), 
    7777
);

$server->run();