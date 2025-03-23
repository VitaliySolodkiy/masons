-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 16, 2022 at 07:02 PM
-- Server version: 8.0.24
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `masons`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`) VALUES
(1, 'T-shirts', 'Any sizes and shapes'),
(2, 'Hoodie', 'Any shapes and prints'),
(3, 'Cups', 'Best choise for gift');

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `name`) VALUES
(1, 'White'),
(2, 'Red'),
(3, 'Black'),
(4, 'Yellow'),
(5, 'Gray'),
(6, 'Green'),
(7, 'Pink'),
(8, 'Brown');

-- --------------------------------------------------------

--
-- Table structure for table `delivery_options`
--

CREATE TABLE `delivery_options` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `min_price` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `delivery_options`
--

INSERT INTO `delivery_options` (`id`, `name`, `min_price`) VALUES
(1, 'Self pick up', 0),
(2, 'Post delivery', 50);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `galleries`
--

CREATE TABLE `galleries` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2022_10_10_160743_create_categories_table', 1),
(6, '2022_10_10_161820_create_products_table', 1),
(7, '2022_10_18_174223_create_orders_table', 1),
(8, '2022_10_18_174734_create_order_items_table', 1),
(9, '2022_11_17_184339_create_galleries_table', 1),
(10, '2022_11_20_142018_create_sizes_table', 1),
(11, '2022_11_20_143328_create_product_sizes_table', 1),
(12, '2022_11_20_143800_create_colors_table', 1),
(13, '2022_11_20_143917_create_product_colors_table', 1),
(14, '2022_11_20_144422_create_reviews_table', 1),
(15, '2022_11_20_151625_create_delivery_options_table', 1),
(16, '2022_11_20_151652_create_payment_options_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint UNSIGNED NOT NULL,
  `total_sum` double(8,2) DEFAULT NULL,
  `user_name` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_email` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_phone` varchar(18) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_city` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_office` int DEFAULT NULL,
  `delivery_method` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_method` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `total_sum`, `user_name`, `user_email`, `user_phone`, `user_city`, `post_office`, `delivery_method`, `payment_method`, `created_at`, `updated_at`) VALUES
(3, NULL, 'root', 'majestis777@gmail.com', '+380989748206', 'Запоріжжя1', NULL, 'Self pick up', 'After delivery payment', '2022-12-11 09:21:07', '2022-12-16 11:50:16'),
(8, NULL, 'Vitalij', 'majestis777@gmail.com', '+380989748217', 'Запоріжжя', 38, 'Post delivery', 'Card', '2022-12-11 15:19:16', '2022-12-13 17:58:31'),
(11, NULL, 'Vitalij', 'majestis777@gmail.com', '+380989748217', 'Запоріжжя', 34, 'Post delivery', 'Card', '2022-12-11 15:47:41', '2022-12-11 15:47:41'),
(12, NULL, 'Vitalij', 'majestis777@gmail.com', '+380989748217', 'Запоріжжя', 34, 'Post delivery', 'Card', '2022-12-12 09:48:54', '2022-12-12 09:48:54'),
(13, NULL, 'Vitalij', 'majestis777@gmail.com', '+380989748217', 'Запоріжжя', 34, 'Self pick up', 'Card', '2022-12-13 19:15:17', '2022-12-13 19:15:17'),
(14, NULL, 'John Dou', 'vitalij.childcamp@mail.com', '+380989748206', 'Kyiv', 34, 'Post delivery', 'After delivery payment', '2022-12-15 15:46:57', '2022-12-15 15:46:57'),
(15, NULL, 'Vitalij', 'majestis777@gmail.com', '+380989748217', 'Запоріжжя', 34, 'Post delivery', 'After delivery payment', '2022-12-16 07:29:09', '2022-12-16 07:29:09'),
(16, NULL, 'Vitalij', 'majestis777@gmail.com', '+380989748217', 'Запоріжжя', 34, 'Post delivery', 'After delivery payment', '2022-12-16 11:44:33', '2022-12-16 11:44:33');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint UNSIGNED NOT NULL,
  `order_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED DEFAULT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_size` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_color` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_price` double(8,2) NOT NULL,
  `product_amount` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_name`, `product_size`, `product_color`, `product_price`, `product_amount`) VALUES
(1, 3, 11, 'Grey polo with pink stripes', 'S', 'Yellow', 160.00, 2),
(4, 8, 1, 'White t-shirt', 'S', 'White', 110.00, 1),
(5, 11, 10, 'Navy blue polo', NULL, NULL, 130.00, 1),
(6, 12, 11, 'Grey polo with pink stripes', 'S', 'Yellow', 160.00, 1),
(7, 12, 5, 'Red polo', 'M', 'Red', 150.00, 2),
(8, 13, 10, 'Navy blue polo', NULL, NULL, 130.00, 1),
(9, 13, 4, 'Grey t-shirt #1', 'L', 'Gray', 130.00, 1),
(10, 13, 5, 'Red polo', 'M', 'Red', 150.00, 2),
(11, 14, 11, 'Grey polo with pink stripes', 'S', 'Yellow', 160.00, 1),
(12, 14, 8, 'Green polo \"NIKE\"', 'L', 'Green', 120.00, 2),
(13, 14, 10, 'Navy blue polo (no colors)', 'L', NULL, 130.00, 1),
(14, 15, 11, 'Grey polo with pink stripes', 'S', 'Yellow', 160.00, 1),
(15, 16, 9, 'Striped polo (without parametrs)', NULL, NULL, 140.00, 1),
(16, 16, 3, 'T-shirt #2', '2XL', 'White', 120.00, 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_options`
--

CREATE TABLE `payment_options` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment_options`
--

INSERT INTO `payment_options` (`id`, `name`) VALUES
(1, 'Card'),
(2, 'After delivery payment');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` bigint NOT NULL,
  `category_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `description`, `price`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'T-shirt #1', '/uploads/products/RefLLoQ8Thyntwxa0akVloPHxPvQqhi1XTcExX0X.png', 'Xiaomi may capture headlines for stunning, high-power smartphones like the Mi Mix and the Mi 6, which are great devices; but arguably the company does low-cost hardware with strong spec lists better. Its latest is the Redmi Note 4X, an update to 2016’s Redmi Note 4, which costs about $160 depending on the color you choose. That’s not very much money for a smartphone today, especially one with features like the Note 4X.', 110, 2, '2022-11-20 13:23:57', '2022-12-16 11:47:41'),
(2, 'Yellow hoodie', '/uploads/products/LigmASnbSDU9k4FXYmbauuEEfQ9ijSTZge9QnPLg.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure vel, illum recusandae natus aut ipsam ipsum, autem quia culpa magni qui id repellat laborum perferendis incidunt consectetur non? Fugiat, a.', 550, 2, '2022-11-20 13:23:57', '2022-11-24 04:47:17'),
(3, 'T-shirt #2', '/uploads/products/sQIFTvytOuIuwo3ZsanW8MtQ8vh4O6oU36PzlFTN.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci distinctio quam reprehenderit cupiditate amet reiciendis. Laborum, veritatis, commodi nostrum voluptate itaque cupiditate alias earum perferendis, ipsam eaque iste magni ducimus!', 120, 1, '2022-11-24 04:46:55', '2022-12-16 10:47:18'),
(4, 'Grey t-shirt #1', '/uploads/products/m3mSC0l39BP1j0fttBdAJavFvpVc5YRUAcO6hdIm.png', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore minus libero perferendis, totam a mollitia optio aut, non veniam ea perspiciatis eaque obcaecati, earum itaque error tenetur temporibus deserunt. Eaque.', 130, 1, '2022-11-24 04:49:53', '2022-11-24 04:49:53'),
(5, 'Red polo', '/uploads/products/6U3mSgftKJqjOZQs6TeFCmlzLVkCLchNsEnHrLWi.png', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis omnis amet tempore voluptate velit, ipsa porro nam deleniti. Velit sapiente temporibus magnam amet quaerat tenetur possimus provident esse eos ex.', 150, 1, '2022-11-24 04:51:28', '2022-11-24 04:58:06'),
(6, 'Yellow polo', '/uploads/products/GNrxAK0haTcbij8scLeWdQJk4ZaR81jnKKo3yIFa.png', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt dolor delectus voluptatem officia nesciunt incidunt mollitia aliquid commodi cupiditate necessitatibus eaque quibusdam, vitae, quas repudiandae, eos obcaecati ullam? Delectus, tempore.', 150, 1, '2022-11-24 04:52:22', '2022-11-24 04:52:22'),
(7, 'Polo \"IDOL\"', '/uploads/products/mEjS1duLc1BFMyBzr1qgwdShtWr6JBemIFIOfi0X.png', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt dolor delectus voluptatem officia nesciunt incidunt mollitia aliquid commodi cupiditate necessitatibus eaque quibusdam, vitae, quas repudiandae, eos obcaecati ullam? Delectus, tempore.', 150, 1, '2022-11-24 04:53:17', '2022-12-13 19:25:59'),
(8, 'Green polo \"NIKE\"', '/uploads/products/53Pq8mHjrYCR860lrMhxtoZieQyWZvcLV19MEJXw.png', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt dolor delectus voluptatem officia nesciunt incidunt mollitia aliquid commodi cupiditate necessitatibus eaque quibusdam, vitae, quas repudiandae, eos obcaecati ullam? Delectus, tempore.', 120, 1, '2022-11-24 04:54:01', '2022-11-24 04:54:02'),
(9, 'Striped polo (without parametrs)', '/uploads/products/Jo3ehNGdUsn5s6AhZzHDoxoFpKjx4sVshWmW5gCF.png', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, culpa ipsum in consequuntur nemo ipsa? Doloribus nostrum accusantium debitis recusandae nam provident quos beatae officia deserunt consectetur. Officiis, nam rem!', 140, 1, '2022-11-24 04:54:57', '2022-12-13 19:29:59'),
(10, 'Navy blue polo (no colors)', '/uploads/products/596XeQFQ1411jMDrbEDNIe4O8JlWqxWGwYaUUO9w.png', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores iure corrupti quos minus? Molestiae fugit omnis iure iusto veritatis ipsam magni deserunt voluptas facilis, atque voluptates quia neque non at.', 130, 1, '2022-11-24 04:55:47', '2022-12-13 19:27:43'),
(11, 'Grey polo with pink stripes', '/uploads/products/8maFK6fn3tQZW99jSVnisqz42y7sGu1oMgIzB0sf.png', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur saepe impedit aperiam, suscipit voluptas dicta doloremque ex, et eum perspiciatis deserunt recusandae, eaque reiciendis eius quasi! Dolorum dolore aut nobis?', 160, 1, '2022-11-24 04:56:35', '2022-11-24 04:56:35'),
(34, 'My cup', '/uploads/products/TTr91mT2TcFQ4vzn5f6CnFUtajmeNmUc8ui7Z6Ct.jpg', 'favorite cup', 25, 3, '2022-11-28 19:23:41', '2022-11-28 19:23:42');

-- --------------------------------------------------------

--
-- Table structure for table `product_colors`
--

CREATE TABLE `product_colors` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `color_id` bigint UNSIGNED DEFAULT NULL,
  `color_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_colors`
--

INSERT INTO `product_colors` (`id`, `product_id`, `color_id`, `color_name`) VALUES
(67, 34, 1, 'White'),
(68, 34, 4, 'Yellow'),
(71, 11, 4, 'Yellow'),
(72, 11, 2, 'Red'),
(78, 2, 4, 'Yellow'),
(79, 2, 6, 'Green'),
(82, 6, 4, 'Yellow'),
(83, 7, 3, 'Black'),
(84, 8, 6, 'Green'),
(99, 3, 1, 'White'),
(100, 3, 2, 'Red'),
(101, 3, 3, 'Black'),
(102, 3, 6, 'Green'),
(103, 5, 2, 'Red'),
(104, 4, 5, 'Gray'),
(109, 1, 1, 'White'),
(110, 1, 4, 'Yellow'),
(111, 1, 7, 'Pink'),
(112, 1, 8, 'Brown');

-- --------------------------------------------------------

--
-- Table structure for table `product_sizes`
--

CREATE TABLE `product_sizes` (
  `id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `size_id` bigint UNSIGNED DEFAULT NULL,
  `size_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_sizes`
--

INSERT INTO `product_sizes` (`id`, `product_id`, `size_id`, `size_name`) VALUES
(31, 11, 1, 'S'),
(32, 11, 2, 'M'),
(37, 2, 2, 'M'),
(38, 2, 3, 'L'),
(39, 2, 4, 'XL'),
(49, 6, 1, 'S'),
(50, 6, 2, 'M'),
(51, 6, 6, '3XL'),
(52, 7, 4, 'XL'),
(53, 7, 5, '2XL'),
(54, 7, 6, '3XL'),
(55, 8, 1, 'S'),
(56, 8, 2, 'M'),
(57, 8, 3, 'L'),
(58, 8, 4, 'XL'),
(59, 8, 5, '2XL'),
(60, 8, 6, '3XL'),
(70, 10, 5, '2XL'),
(71, 10, 3, 'L'),
(72, 10, 2, 'M'),
(91, 3, 5, '2XL'),
(92, 3, 6, '3XL'),
(93, 3, 4, 'XL'),
(94, 5, 1, 'S'),
(95, 5, 2, 'M'),
(96, 5, 3, 'L'),
(97, 5, 4, 'XL'),
(98, 5, 5, '2XL'),
(99, 5, 6, '3XL'),
(100, 4, 1, 'S'),
(101, 4, 2, 'M'),
(102, 4, 3, 'L'),
(104, 1, 1, 'S');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `name`, `content`, `rating`, `product_id`, `created_at`, `updated_at`) VALUES
(8, 'John Doe', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi ipsa incidunt excepturi consequatur, laboriosam dignissimos possimus neque placeat, eligendi veritatis dolores dolorem saepe iste iusto, sequi voluptatibus ea nesciunt minus!', 5, 2, '2022-12-05 16:43:49', '2022-12-05 16:43:49'),
(11, 'Vitalij', 'best hoodie ever! thanl you very much', 5, 2, '2022-12-06 18:54:33', '2022-12-06 18:54:33'),
(14, 'Vitalij', 'bad', 5, 2, '2022-12-15 16:59:02', '2022-12-16 11:54:58'),
(15, 'Vitalij', 'Good t-shirt', 5, 3, '2022-12-16 10:48:19', '2022-12-16 10:48:19'),
(16, 'Vitalij', 'Bad print', 2, 3, '2022-12-16 10:48:31', '2022-12-16 10:48:31'),
(17, 'Vitalij', 'cool', 4, 2, '2022-12-16 11:39:14', '2022-12-16 11:39:14'),
(18, 'Vitalij', 'bad', 1, 2, '2022-12-16 11:39:31', '2022-12-16 11:39:31'),
(19, 'SQL1', 'kljh', 3, 2, '2022-12-16 11:55:33', '2022-12-16 11:55:33'),
(20, 'SQL1', 'edfrg', 3, 7, '2022-12-16 11:56:00', '2022-12-16 11:56:00'),
(21, 'dfgdf', 'dfgdf', 4, 6, '2022-12-16 11:56:50', '2022-12-16 11:56:50');

-- --------------------------------------------------------

--
-- Table structure for table `sizes`
--

CREATE TABLE `sizes` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`id`, `name`) VALUES
(1, 'S'),
(2, 'M'),
(3, 'L'),
(4, 'XL'),
(5, '2XL'),
(6, '3XL');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `phone`, `city`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Vitalij', 'majestis777@gmail.com', NULL, '$2y$10$aya745YWEoFUmvc73PdHDOM4UCJte2iib0Zw6MOBMxSTgYLxmU8XS', '+380989748217', NULL, 'admin', NULL, '2022-11-20 13:31:58', '2022-11-20 13:31:58'),
(7, 'John Dou', 'vitalij.childcamp@mail.com', NULL, '$2y$10$lHkll7Sa09BzEjNSQufkHeujZU5LcSGnnyW6wFyx1.DUSj05PY30e', '+380989748206', 'Kyiv', 'user', NULL, '2022-12-11 14:17:35', '2022-12-11 14:17:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `delivery_options`
--
ALTER TABLE `delivery_options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `galleries`
--
ALTER TABLE `galleries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `galleries_product_id_foreign` (`product_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `payment_options`
--
ALTER TABLE `payment_options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- Indexes for table `product_colors`
--
ALTER TABLE `product_colors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_colors_color_id_foreign` (`color_id`),
  ADD KEY `product_colors_product_id_foreign` (`product_id`);

--
-- Indexes for table `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_sizes_size_id_foreign` (`size_id`),
  ADD KEY `product_sizes_product_id_foreign` (`product_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_product_id_foreign` (`product_id`);

--
-- Indexes for table `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `delivery_options`
--
ALTER TABLE `delivery_options`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `galleries`
--
ALTER TABLE `galleries`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `payment_options`
--
ALTER TABLE `payment_options`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `product_colors`
--
ALTER TABLE `product_colors`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `product_sizes`
--
ALTER TABLE `product_sizes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `galleries`
--
ALTER TABLE `galleries`
  ADD CONSTRAINT `galleries_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `product_colors`
--
ALTER TABLE `product_colors`
  ADD CONSTRAINT `product_colors_color_id_foreign` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `product_colors_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD CONSTRAINT `product_sizes_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_sizes_size_id_foreign` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
