import React from 'react'
import { categotyInfos } from './categoryFullinfos';
import CategoryCard from './CategoryCard';
import classes from './Category.module.css';

function Category() {
  return (
    <section className={classes.category__container}>
        {
            categotyInfos?.map((infos, i) => ( 
                <CategoryCard
                key={i}
                renderAdd={true}
                data = {infos} />
            ))
        }
    </section>
  )
}

export default Category;