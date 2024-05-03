<?php

// Fonction pour générer la proforma
function genererProforma($idClient, $dateEntree, $dateSortie) {
    // Vérifier la disponibilité des dates d'entrée et de sortie
    if ($dateEntree == $dateSortie && $dateSortie == date("Y-m-d")) {
        // Requête MongoDB pour récupérer les missions pour les dates données
        $missions = getMissionsByDates($dateEntree);

        if (empty($missions)) {
            return "AUCUNE MISSION À CETTE DATE";
        } else {
            // Récupérer et afficher les tarifs des différentes missions
            $tarifs = array();
            foreach ($missions as $mission) {
                $tarif = getTarifByMission($mission);
                $tarifs[] = $tarif;
            }
            return $tarifs; // Ou générer la proforma avec les tarifs récupérés
        }
    } elseif ($dateEntree == $dateSortie && $dateSortie != date("Y-m-d")) {
        // Requête MongoDB pour récupérer les missions pour la date de sortie donnée
        $missions = getMissionsByDate($dateSortie);

        if (empty($missions)) {
            return "AUCUNE MISSION À CETTE DATE";
        } else {
            // Vérification dans la table modification_tarif pour chaque mission
            foreach ($missions as $mission) {
                $tarif = getModifiedTarifByMission($mission);
                if ($tarif != null) {
                    // Appliquer le tarif modifié
                    // Générer la proforma avec le tarif modifié
                    return $tarif;
                }
            }
            // Si aucun tarif modifié trouvé, utiliser le tarif standard
            $tarifStandard = getStandardTarif();
            // Générer la proforma avec le tarif standard
            return $tarifStandard;
        }
    } elseif ($dateEntree != $dateSortie) {
        if ($dateEntree > $dateSortie) {
            return "INCOHÉRENCE DE DATE";
        } else {
            // Requête MongoDB pour récupérer les missions pour la plage de dates données
            $missions = getMissionsByDateRange($dateEntree, $dateSortie);

            if (empty($missions)) {
                return "AUCUNE MISSION À CETTE DATE";
            } else {
                // Vérification dans la table modification_tarif pour chaque mission
                foreach ($missions as $mission) {
                    $tarif = getModifiedTarifByMission($mission);
                    if ($tarif != null) {
                        // Appliquer le tarif modifié
                        // Générer la proforma avec le tarif modifié
                        return $tarif;
                    }
                }
                // Si aucun tarif modifié trouvé, utiliser le tarif standard
                $tarifStandard = getStandardTarif();
                // Générer la proforma avec le tarif standard
                return $tarifStandard;
            }
        }
    }
}

// Exemple d'utilisation
$idClient = "123456";
$dateEntree = "2024-05-01";
$dateSortie = "2024-05-05";
$proforma = genererProforma($idClient, $dateEntree, $dateSortie);
var_dump($proforma); // Afficher la proforma

?>
