cd venv/lib/python3.8/site-packages
zip -r ../../../../my-deployment-package.zip .
cd ../../../../
zip -g my-deployment-package.zip lambda_function.py config.py google_distance_handler.py optimize_routes.py route_classes.py utils.py analyze_routes.py
