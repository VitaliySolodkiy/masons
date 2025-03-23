FROM php:8.1-fpm

# Arguments defined in docker-compose.yml
ARG user
ARG uid

RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create system user to run Composer and Artisan Commands:

# -G (--groups) -> list of supplementary groups of the new account
# -u (--uid) -> user ID of the new account
# -d (--home-dir) -> home directory of the new account
RUN useradd -G www-data,root -u $uid -d /home/$user $user

# -p (--parents) -> no error if existing, make parent directories as needed
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

WORKDIR /var/www

USER $user
