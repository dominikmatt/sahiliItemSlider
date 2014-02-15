<?php
    $data = array(0 => array(
                        0 => 'test1.1',
                        1 => 'test1.2',
                        2 => 'test1.3'),
                  1 => array(
                        0 => 'test2.1',
                        1 => 'test2.2',
                        2 => 'test2.3'),
                  2 => array(
                        0 => 'test3.1',
                        1 => 'test3.2',
                        2 => 'test3.3',
                        3 => 'test3.4',
                        4 => 'test3.5',
                        5 => 'test3.6',
                        6 => 'test3.7',
                        7 => 'test3.8',
                        8 => 'test3.9',
                        9 => 'test3.10'),
                 );

    echo json_encode($data[$_GET['index']]);
?>