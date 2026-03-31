FROM php:8.2-apache

WORKDIR /var/www/html

# Enable mod_rewrite
RUN a2enmod rewrite

# Copy PHP files
COPY . .

# Set permissions
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80

CMD ["apache2-foreground"]
