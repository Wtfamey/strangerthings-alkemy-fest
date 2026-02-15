# Backend-only for Railway
FROM php:8.1-apache

# Install required extensions
RUN docker-php-ext-install pdo pdo_mysql

# Copy only API files
COPY public/ /var/www/html/
COPY public/api/ /var/www/html/api/
COPY public/api/config/ /var/www/html/api/config/

# Set permissions
RUN chown -R www-data:www-data /var/www/html/
RUN chmod -R 755 /var/www/html/

# Configure Apache
RUN a2enmod rewrite
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Create .htaccess for API routing
RUN echo "RewriteEngine On\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule ^(.*)$ index.php [QSA,L]" > /var/www/html/.htaccess

# Set working directory
WORKDIR /var/www/html

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/api/events/read.php || exit 1

# Start Apache
CMD ["apache2-foreground"]
