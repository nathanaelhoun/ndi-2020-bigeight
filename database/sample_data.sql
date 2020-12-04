INSERT INTO `Product` (`pr_name`)
VALUES ("Crème solaire"),
    ("Parfum / Déodorant"),
    ("Crème hydratante"),
    ("Maquillage"),
    ("Essence"),
    ("Cigarette"),
    ("Engrais / pesticides"),
    ("Peintures"),
    ("Autre");
INSERT INTO `User` (
        `us_firstname`,
        `us_lastname`,
        `us_age`,
        `us_email`,
        `us_password`
    )
VALUES (
        'François',
        'Poguet',
        20,
        'francois@poguet.com',
        '1234'
    ),
    ('Nath', 'Houn', 20, 'nath@houn.fr', '1234');
INSERT INTO `Spot` (`sp_name`, `sp_address`)
VALUES ("Jardin de Fabian", "Franois"),
    ("La Seine", "Paris");
INSERT INTO `Activity`(
        `sp_id`,
        `us_email`,
        `ac_startDate`,
        `ac_endDate`,
        `ac_nbBathers`,
        `ac_nbFishingBoat`,
        `ac_nbPleasureBoat`,
        `ac_nbSailBoat`
    )
VALUES (
        1,
        'nath@houn.fr',
        '202003081000',
        '202003081400',
        7,
        2,
        1,
        5
    ),
    (
        1,
        'nath@houn.fr',
        '202003101000',
        '202003101430',
        3,
        3,
        4,
        0
    ),
    (
        1,
        'francois@poguet.com',
        '202003081700',
        '202003082000',
        2,
        2,
        1,
        3
    );
INSERT INTO `UsedProduct` (`ac_id`, `pr_id`)
VALUES (1, 1),
    (1, 2),
    (1, 3),
    (2, 4),
    (2, 5),
    (2, 6),
    (3, 1),
    (3, 2);