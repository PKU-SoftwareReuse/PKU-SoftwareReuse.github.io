# Base image: Ruby with necessary dependencies for Jekyll
FROM ruby:3.2

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    nodejs \
    && rm -rf /var/lib/apt/lists/*


# Create a non-root user with UID 1000
RUN groupadd -g 1000 vscode && \
    useradd -m -u 1000 -g vscode vscode

# Set the working directory
WORKDIR /usr/src/app

# Set permissions for the working directory
RUN chown -R vscode:vscode /usr/src/app

# Switch to the non-root user
USER vscode

# Copy Gem dependencies and lockfile so bundle install matches runtime exactly
COPY Gemfile Gemfile.lock ./



# Install bundler and dependencies
RUN gem install connection_pool:2.5.0
RUN gem install bundler:2.3.26

# 1. 强制删掉可能存在的旧配置
RUN bundle config unset mirror.https://rubygems.org/

# 2. 改用 Ruby China 镜像
RUN bundle config mirror.https://rubygems.org https://gems.ruby-china.com

# 3. 关键：禁用并行下载 (防止数据包冲突导致的 marshal short 错误)
RUN bundle config set jobs 1

# 4. 再次安装
RUN bundle install

# Command to serve the Jekyll site via bundler context
CMD ["bundle", "exec", "jekyll", "serve", "-H", "0.0.0.0", "-w", "--config", "_config.yml,_config_docker.yml", "--destination", "/tmp/jekyll-preview"]
