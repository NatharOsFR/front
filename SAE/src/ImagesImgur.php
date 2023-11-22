<?php
require '../vendor/autoload.php';

$client_id = 'f63500e82ce560c';


if ($_FILES['image']['error'] == UPLOAD_ERR_OK) {
    $image = $_FILES['image']['tmp_name'];

    $client = new \GuzzleHttp\Client();
    $response = $client->request('POST', 'https://api.imgur.com/3/image', [
        'headers' => [
            'Authorization' => 'Client-ID ' . $client_id,
        ],
        'multipart' => [
            [
                'name'     => 'image',
                'contents' => fopen($image, 'r'),
            ],
        ],
    ]);

    $result = json_decode($response->getBody(), true);

    if ($response->getStatusCode() == 200) {
        $imgurLink = $result['data']['link'];
        echo 'Lien Imgur: ' . $imgurLink;
    } else {
        echo 'Erreur lors du téléchargement sur Imgur.';
    }
} else {
    echo 'Veuillez sélectionner une image.';
}

?>