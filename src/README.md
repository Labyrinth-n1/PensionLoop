# GouvPensionloop

## Système de Gestion des Pensions de Retraite - Gouvernement du Bénin

GouvPensionloop est une application web moderne et complète pour la gestion et le versement des pensions de retraite au Bénin. Le système permet de gérer les retraités, d'effectuer des paiements via compte bancaire ou Mobile Money, et de suivre toutes les transactions.

## 🎯 Fonctionnalités Principales

### 1. Tableau de Bord
- Vue d'ensemble des statistiques clés (total retraités, montants versés, taux de réussite)
- Graphiques d'évolution des paiements sur 6 mois
- Liste des dernières transactions
- Aperçu des prochains paiements automatiques

### 2. Gestion des Retraités
- Liste complète des retraités avec filtres et recherche
- Ajout de nouveaux retraités avec formulaire multi-étapes
- Importation en masse via CSV
- Fiche détaillée pour chaque retraité
- Historique des paiements par retraité

### 3. Paiements
**Paiements Manuels:**
- Sélection individuelle ou par lot
- Support Compte Bancaire et Mobile Money (MTN, Moov, Flooz)
- Processus de confirmation sécurisé
- Suivi en temps réel des paiements

**Paiements Automatiques:**
- Configuration des paiements récurrents mensuels
- Programmation du jour et de l'heure
- Notifications automatiques
- Historique complet

### 4. Historique des Transactions
- Consultation de toutes les transactions
- Filtres avancés (statut, type, montant, date)
- Export en CSV, Excel, PDF
- Détails complets de chaque transaction

### 5. Paramètres
- **Utilisateurs:** Gestion des accès et rôles (Super Admin, Admin, Opérateur)
- **Fintechs:** Configuration des opérateurs Mobile Money
- **Notifications:** Personnalisation des alertes par email/SMS
- **Sécurité:** 2FA, gestion des sessions, politique de mot de passe

### 6. Profil Utilisateur
- Informations personnelles
- Changement de mot de passe avec indicateur de force
- Préférences (langue, format de date, fuseau horaire, thème)
- Statistiques d'activité

## 🎨 Design System

### Palette de Couleurs
- **Primary Blue:** #1E40AF (marque principale, confiance)
- **Success Green:** #059669 (réussite)
- **Warning Orange:** #F59E0B (attention)
- **Error Red:** #DC2626 (erreur)
- **Mobile Money Orange:** #FF6B00
- **Mobile Money Green:** #00B050

### Typographie
- **Police:** Inter
- **H1:** 32px Bold
- **H2:** 24px Bold
- **H3:** 20px Semibold
- **Body:** 14px Regular

### Composants
- Border Radius: 8px (cartes), 6px (boutons), 4px (inputs)
- Shadows: Petit/Moyen/Grand
- Espacement: Système basé sur 8px (4, 8, 16, 24, 32, 48, 64px)

## 🚀 Navigation

### Pages Principales
1. **/** - Page de connexion sécurisée
2. **/dashboard** - Tableau de bord principal
3. **/retraites** - Gestion des retraités
4. **/paiements** - Effectuer des paiements
5. **/historique** - Historique des transactions
6. **/parametres** - Configuration du système
7. **/profil** - Profil utilisateur

## 📊 Données Fictives

L'application utilise des données fictives réalistes pour la démonstration:
- 10 retraités échantillons avec informations complètes
- Transactions de test avec différents statuts
- Graphiques avec données des 6 derniers mois
- Noms ouest-africains authentiques
- Montants de pension typiques (35,000-75,000 FCFA)

## 🔐 Sécurité

- Authentification à deux facteurs (2FA)
- Gestion des sessions actives
- Politique de mot de passe configurable
- Alertes de sécurité
- Confirmation obligatoire pour les paiements

## 💡 Fonctionnalités Avancées

### Paiements
- Traitement par lots
- Support de plusieurs opérateurs Mobile Money
- Frais de transaction calculés automatiquement
- Retry automatique en cas d'échec
- Génération de rapports PDF

### Notifications
- Email et SMS
- Personnalisation par type d'événement
- Templates configurables
- Alertes temps réel

### Reporting
- Export en multiple formats (CSV, Excel, PDF)
- Graphiques interactifs
- Statistiques détaillées
- Historique complet

## 🎯 Cas d'Usage

1. **Paiement Mensuel Standard**
   - Sélectionner "Tous les retraités actifs"
   - Choisir le type de paiement
   - Confirmer et lancer

2. **Paiement d'Urgence Individuel**
   - Rechercher le retraité
   - Voir détails
   - "Payer Maintenant"

3. **Configuration Paiement Automatique**
   - Aller à Paiements > Automatique
   - Activer et configurer
   - Définir jour, heure, notifications

4. **Ajout de Nouveaux Retraités**
   - Ajouter individuellement via formulaire
   - Ou importer en masse via CSV

5. **Suivi et Reporting**
   - Consulter l'historique
   - Filtrer par critères
   - Exporter les données

## 🌍 Localisation

- Interface en français
- Format de date DD/MM/YYYY
- Devise: FCFA (Franc CFA)
- Fuseau horaire: Africa/Porto-Novo (GMT+1)

## 📱 Responsive

L'application est optimisée pour:
- Desktop (1440x1024px et plus)
- Tablet (adaptations intelligentes)
- Mobile (navigation adaptative)

## ⚡ Performance

- Chargement optimisé des données
- Pagination intelligente
- Lazy loading des images
- Transitions fluides
- Animations performantes

## 🔄 États et Interactions

### États des Boutons
- Default, Hover, Active, Disabled, Loading

### États des Inputs
- Empty, Filled, Focus, Error, Success, Disabled

### Animations
- Modales: Scale + Fade
- Toast: Slide from right
- Transitions de page: Fade
- Progress bars: Smooth transitions

## 📝 Notes Importantes

- Ceci est un **prototype/démo** avec données fictives
- Ne pas utiliser pour collecter des données personnelles sensibles
- Les paiements sont simulés (aucune transaction réelle)
- Toutes les API keys affichées sont fictives

## 🎨 Personnalisation

Le système de design est entièrement personnalisable via:
- `/styles/globals.css` - Variables CSS
- Composants modulaires réutilisables
- Palette de couleurs centralisée

## 🚀 Démarrage Rapide

1. Accéder à la page de login (/)
2. Entrer n'importe quel email/mot de passe
3. Cliquer sur "Se connecter"
4. Explorer les différentes fonctionnalités

---

**Développé pour le Gouvernement du Bénin**  
Version 1.0.0 - Décembre 2024
