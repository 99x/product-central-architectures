.PHONY: install-docs serve-docs build-docs

install-docs:
	cd docs && bundle install

serve-docs:
	cd docs && bundle exec jekyll serve

build-docs:
	cd docs && bundle exec jekyll build