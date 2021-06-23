# Generated by Django 3.2.4 on 2021-06-23 12:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_order_orderitem_review_shippingaddress'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='count_in_stock',
            new_name='count_In_Stock',
        ),
        migrations.RenameField(
            model_name='product',
            old_name='created_at',
            new_name='created_At',
        ),
        migrations.RenameField(
            model_name='product',
            old_name='num_reviews',
            new_name='num_Reviews',
        ),
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]